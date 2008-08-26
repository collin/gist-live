/*
 * Copyright 2008 Google Inc. All Rights Reserved.
 * Author: fraser@google.com (Neil Fraser)
 * Author: mikeslemmer@gmail.com (Mike Slemmer)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Diff Match and Patch
 * http://code.google.com/p/google-diff-match-patch/
 */

// Code known to compile and run with Qt 4.3.3 and Qt 4.4.0.
#include <QtCore>
#include "diff_match_patch.h"


//////////////////////////
//
// Diff Class
//
//////////////////////////


/**
 * Constructor.  Initializes the diff with the provided values.
 * @param operation One of INSERT, DELETE or EQUAL
 * @param text The text being applied
 */
Diff::Diff(Operation _operation, const QString &_text) :
operation(_operation), text(_text) {
  // Construct a diff with the specified operation and text.
}

Diff::Diff() {
}


QString Diff::strOperation(Operation op) {
  switch(op) {
    case INSERT:
      return "INSERT";
    case DELETE:
      return "DELETE";
    case EQUAL:
      return "EQUAL";
  }
  throw("Invalid operation.");
}

/**
 * Display a human-readable version of this Diff.
 * @return text version
 */
QString Diff::toString() const {
  QString prettyText = text;
  prettyText.replace('\n', L'\u00b6');  // Replace linebreaks with Pilcrow signs.
  qDebug(qPrintable(QString("Diff(") + strOperation(operation) + QString(",\"") + prettyText + QString("\")")));
  return QString("Diff(") + strOperation(operation) + QString(",\"") + prettyText + QString("\")");
}

/**
 * Is this Diff equivalent to another Diff?
 * @param d Another Diff to compare against
 * @return true or false
 */
bool Diff::operator==(const Diff &d) const {
  return (d.operation == this->operation) && (d.text == this->text);
}

bool Diff::operator!=(const Diff &d) const {
  return !(operator == (d));
}


/////////////////////////////////////////////
//
// Patch Class
//
/////////////////////////////////////////////


/**
 * Constructor.  Initializes with an empty list of diffs.
 */
Patch::Patch() :
start1(0), start2(0),
length1(0), length2(0)
{
}

bool Patch::isNull() const {
  if (start1 == 0 && start2 == 0 && length1 == 0 && length2 == 0
      && diffs.size() == 0) {
    return true;
  }
  return false;
}


/**
 * Emmulate GNU diff's format.
 * Header: @@ -382,8 +481,9 @@
 * Indicies are printed as 1-based, not 0-based.
 * @return The GNU diff string
 */
QString Patch::toString() {
  QString coords1, coords2;
  if (length1 == 0) {
    coords1 = QString::number(start1) + QString(",0");
  } else if (length1 == 1) {
    coords1 = QString::number(start1 + 1);
  } else {
    coords1 = QString::number(start1 + 1) + QString(",") + QString::number(length1);
  }
  if (length2 == 0) {
    coords2 = QString::number(start2) + QString(",0");
  } else if (length2 == 1) {
    coords2 = QString::number(start2 + 1);
  } else {
    coords2 = QString::number(start2 + 1) + QString(",") + QString::number(length2);
  }
  QString txt;
  txt = QString("@@ -") + coords1 + QString(" +") + coords2 + QString(" @@\n");
  // Escape the body of the patch with %xx notation.
  foreach (Diff aDiff, diffs) {
    switch (aDiff.operation) {
      case INSERT:
        txt += QString('+');
        break;
      case DELETE:
        txt += QString('-');
        break;
      case EQUAL:
        txt += QString(' ');
        break;
    }
    txt += QString(QUrl::toPercentEncoding(aDiff.text, " !~*'();/?:@&=+$,#")) + QString("\n");
  }

  return txt;
}


/////////////////////////////////////////////
//
// diff_match_patch Class
//
/////////////////////////////////////////////

diff_match_patch::diff_match_patch() :
Diff_Timeout(1.0f),
Diff_EditCost(4),
Diff_DualThreshold(32),
Match_Balance(0.5f),
Match_Threshold(0.5f),
Match_MinLength(100),
Match_MaxLength(1000),
Patch_Margin(4),
Match_MaxBits(32)
{
}


QList<Diff> diff_match_patch::diff_main(const QString &text1, const QString &text2) {
  return diff_main(text1, text2, true);
}


QList<Diff> diff_match_patch::diff_main(const QString &text1, const QString &text2, bool checklines) {
  // Check for equality (speedup)
  QList<Diff> diffs;
  if (text1 == text2) {
    diffs.append(Diff(EQUAL, text1));
    return diffs;
  }

  // Trim off common prefix (speedup)
  int commonlength = diff_commonPrefix(text1, text2);
  const QString &commonprefix = text1.mid(0, commonlength);
  QString textChopped1 = text1.mid(commonlength);
  QString textChopped2 = text2.mid(commonlength);

  // Trim off common suffix (speedup)
  commonlength = diff_commonSuffix(textChopped1, textChopped2);
  const QString &commonsuffix = textChopped1.mid(textChopped1.length() - commonlength);
  textChopped1 = textChopped1.mid(0, textChopped1.length() - commonlength);
  textChopped2 = textChopped2.mid(0, textChopped2.length() - commonlength);

  // Compute the diff on the middle block
  diffs = diff_compute(textChopped1, textChopped2, checklines);

  // Restore the prefix and suffix
  if (commonprefix.length() != 0) {
    diffs.prepend(Diff(EQUAL, commonprefix));
  }
  if (commonsuffix.length() != 0) {
    diffs.append(Diff(EQUAL, commonsuffix));
  }

  diff_cleanupMerge(diffs);

  return diffs;
}


QList<Diff> diff_match_patch::diff_compute(QString text1, QString text2, bool checklines) {
  QList<Diff> diffs;

  if (text1.length() == 0) {
    // Just add some text (speedup)
    diffs.append(Diff(INSERT, text2));
    return diffs;
  }

  if (text2.length() == 0) {
    // Just delete some text (speedup)
    diffs.append(Diff(DELETE, text1));
    return diffs;
  }

  {
    QString longtext = text1.length() > text2.length() ? text1 : text2;
    QString shorttext = text1.length() > text2.length() ? text2 : text1;
    int i = longtext.indexOf(shorttext);
    if (i != -1) {
      // Shorter text is inside the longer text (speedup)
      Operation op = (text1.length() > text2.length()) ? DELETE : INSERT;
      diffs.append(Diff(op, longtext.mid(0, i)));
      diffs.append(Diff(EQUAL, shorttext));
      diffs.append(Diff(op, longtext.mid(i + shorttext.length())));
      return diffs;
    }
    // Garbage collect longtext and shorttext by scoping out.
  }

  // Check to see if the problem can be split in two.
  QStringList hm = diff_halfMatch(text1, text2);
  if (hm.count() > 0) {
    // A half-match was found, sort out the return data.
    QString text1_a = hm[0];
    QString text1_b = hm[1];
    QString text2_a = hm[2];
    QString text2_b = hm[3];
    QString mid_common = hm[4];
    // Send both pairs off for separate processing.
    QList<Diff> diffs_a = diff_main(text1_a, text2_a, checklines);
    QList<Diff> diffs_b = diff_main(text1_b, text2_b, checklines);
    // Merge the results.
    diffs = diffs_a;
    diffs.append(Diff(EQUAL, mid_common));
    diffs += diffs_b;
    return diffs;
  }

  // Perform a real diff.
  if (checklines && (text1.length() < 100 || text2.length() < 100)) {
    checklines = false;  // Too trivial for the overhead.
  }
  QStringList linearray;
  if (checklines) {
    // Scan the text on a line-by-line basis first.
    QList<QVariant> b = diff_linesToChars(text1, text2);
    text1 = b[0].toString();
    text2 = b[1].toString();
    linearray = b[2].toStringList();
  }

  diffs = diff_map(text1, text2);
  if (diffs.isEmpty()) {
    // No acceptable result.
    diffs = QList<Diff>();
    diffs.append(Diff(DELETE, text1));
    diffs.append(Diff(INSERT, text2));
  }

  if (checklines) {
    // Convert the diff back to original text.
    diff_charsToLines(diffs, linearray);
    // Eliminate freak matches (e.g. blank lines)
    diff_cleanupSemantic(diffs);

    // Rediff any replacement blocks, this time character-by-character.
    // Add a dummy entry at the end.
    diffs.append(Diff(EQUAL, ""));
    int count_delete = 0;
    int count_insert = 0;
    QString text_delete = "";
    QString text_insert = "";

    QMutableListIterator<Diff> pointer(diffs);
    Diff *thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
    while (thisDiff != NULL) {
      switch (thisDiff->operation) {
        case INSERT:
          count_insert++;
          text_insert += thisDiff->text;
          break;
        case DELETE:
          count_delete++;
          text_delete += thisDiff->text;
          break;
        case EQUAL:
          // Upon reaching an equality, check for prior redundancies.
          if (count_delete >= 1 && count_insert >= 1) {
            // Delete the offending records and add the merged ones.
            pointer.previous();
            for (int j = 0; j < count_delete + count_insert; j++) {
              pointer.previous();
              pointer.remove();
            }
            foreach (Diff newDiff, diff_main(text_delete, text_insert, false)) {
              pointer.insert(newDiff);
            }
          }
          count_insert = 0;
          count_delete = 0;
          text_delete = "";
          text_insert = "";
          break;
      }
      thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
    }
    diffs.removeLast();  // Remove the dummy entry at the end.
  }
  return diffs;
}


QList<QVariant> diff_match_patch::diff_linesToChars(const QString &text1, const QString &text2) {
  QStringList lineArray;
  QMap<QString, int> lineHash;
  // e.g. linearray[4] == "Hello\n"
  // e.g. linehash.get("Hello\n") == 4

  // "\x00" is a valid character, but various debuggers don't like it.
  // So we'll insert a junk entry to avoid generating a null character.
  lineArray.append("");

  QString chars1 = diff_linesToCharsMunge(text1, lineArray, lineHash);
  QString chars2 = diff_linesToCharsMunge(text2, lineArray, lineHash);

  QList<QVariant> listRet;
  listRet.append(QVariant::fromValue(chars1));
  listRet.append(QVariant::fromValue(chars2));
  listRet.append(QVariant::fromValue(lineArray));
  return listRet;
}


QString diff_match_patch::diff_linesToCharsMunge(const QString &text, QStringList &lineArray,
                                                 QMap<QString, int> &lineHash) {
  int lineStart = 0;
  int lineEnd = -1;
  QString line;
  QString chars;
  // Walk the text, pulling out a substring for each line.
  // text.split('\n') would would temporarily double our memory footprint.
  // Modifying text would create many large strings to garbage collect.
  while (lineEnd < text.length() - 1) {
    lineEnd = text.indexOf('\n', lineStart);
    if (lineEnd == -1) {
      lineEnd = text.length() - 1;
    }
    line = text.mid(lineStart, (lineEnd + 1) - (lineStart));
    lineStart = lineEnd + 1;

    if (lineHash.contains(line)) {
      chars += QChar(static_cast<ushort>(lineHash.value(line)));
    } else {
      lineArray.append(line);
      lineHash.insert(line, lineArray.size() - 1);
      chars += QChar(static_cast<ushort>(lineArray.size() - 1));
    }
  }
  return chars;
}



void diff_match_patch::diff_charsToLines(QList<Diff> &diffs, const QStringList &lineArray) {
  // Qt has no mutable foreach construct.
  QMutableListIterator<Diff> i(diffs);
  while(i.hasNext()) {
    Diff &diff = i.next();
    QString text;
    for (int y = 0; y < diff.text.length(); y++) {
      text += lineArray.value(static_cast<ushort>(diff.text[y].unicode()));
    }
    diff.text = text;
  }
}

QList<Diff> diff_match_patch::diff_map(const QString &text1, const QString &text2) {
  QTime ms_end = QTime::currentTime().addMSecs((int) (Diff_Timeout * 1000));
  const int max_d = text1.length() + text2.length() - 1;
  bool doubleEnd = Diff_DualThreshold * 2 < max_d;
  QList<QSet<QPair<int, int> > > v_map1;
  QList<QSet<QPair<int, int> > > v_map2;
  QMap<int, int> v1;
  QMap<int, int> v2;
  v1.insert(1, 0);
  v2.insert(1, 0);
  int x, y;
  QPair<int, int> footstep;  // Used to track overlapping paths.
  QMap<QPair<int, int>, int> footsteps;
  bool done = false;
  // If the total number of characters is odd, then the front path will
  // collide with the reverse path.
  bool front = ((text1.length() + text2.length()) % 2 == 1);
  for (int d = 0; d < max_d; d++) {

    // Bail out if timeout reached.
    if (Diff_Timeout > 0 && QTime::currentTime() > ms_end) {
      return QList<Diff>();
    }

    // Walk the front path one step.
    v_map1.append(QSet<QPair<int, int> >());  // Adds at index 'd'.
    for (int k = -d; k <= d; k += 2) {
      if (k == -d || (k != d && v1.value(k - 1) < v1.value(k + 1))) {
        x = v1.value(k + 1);
      } else {
        x = v1.value(k - 1) + 1;
      }
      y = x - k;
      if (doubleEnd) {
        footstep = QPair<int, int>(x, y);
        if (front && (footsteps.contains(footstep))) {
          done = true;
        }
        if (!front) {
          footsteps.insert(footstep, d);
        }
      }
      while (!done && x < text1.length() && y < text2.length()
          && text1[x] == text2[y]) {
        x++;
        y++;
        if (doubleEnd) {
          footstep = QPair<int, int>(x, y);
          if (front && (footsteps.contains(footstep))) {
            done = true;
          }
          if (!front) {
            footsteps.insert(footstep, d);
          }
        }
      }
      v1.insert(k, x);
      v_map1[d].insert(QPair<int, int>(x, y));
      if (x == text1.length() && y == text2.length()) {
        // Reached the end in single-path mode.
        return diff_path1(v_map1, text1, text2);
      } else if (done) {
        // Front path ran over reverse path.
        v_map2 = v_map2.mid(0, footsteps.value(footstep) + 1);
        QList<Diff> a = diff_path1(v_map1, text1.mid(0, x), text2.mid(0, y));
        a += diff_path2(v_map2, text1.mid(x), text2.mid(y));
        return a;
      }
    }

    if (doubleEnd) {
      // Walk the reverse path one step.
      v_map2.append(QSet<QPair<int, int> >()); // Adds at index 'd'.
      for (int k = -d; k <= d; k += 2) {
        if (k == -d || (k != d && v2.value(k - 1) < v2.value(k + 1))) {
          x = v2.value(k + 1);
        } else {
          x = v2.value(k - 1) + 1;
        }
        y = x - k;

        footstep = QPair<int, int>(text1.length() - x, text2.length() - y);
        if (!front && (footsteps.contains(footstep))) {
          done = true;
        }
        if (front) {
          footsteps.insert(footstep, d);
        }
        while (!done && x < text1.length() && y < text2.length()
            && text1[text1.length() - x - 1] == text2[text2.length() - y - 1]) {
          x++;
          y++;
          footstep = QPair<int, int>(text1.length() - x, text2.length() - y);
          if (!front && (footsteps.contains(footstep))) {
            done = true;
          }
          if (front) {
            footsteps.insert(footstep, d);
          }
        }
        v2.insert(k, x);
        v_map2[d].insert(QPair<int, int>(x, y));
        if (done) {
          // Reverse path ran over front path.
          v_map1 = v_map1.mid(0, footsteps.value(footstep) + 1);
          QList<Diff> a
              = diff_path1(v_map1, text1.mid(0, text1.length() - x),
              text2.mid(0, text2.length() - y));
          a += diff_path2(v_map2, text1.mid(text1.length() - x),
              text2.mid(text2.length() - y));
          return a;
        }
      }
    }
  }
  // Number of diffs equals number of characters, no commonality at all.
  return QList<Diff>();
}


QList<Diff> diff_match_patch::diff_path1(const QList<QSet<QPair<int, int> > > &v_map,
                                         const QString &text1, const QString &text2) {
  QList<Diff> path;
  int x = text1.length();
  int y = text2.length();
  Operation last_op = EQUAL;
  bool first = true;
  for (int d = v_map.size() - 2; d >= 0; d--) {
    while (true) {
      if (v_map.value(d).contains(QPair<int, int>(x - 1, y))) {
        x--;
        if (last_op == DELETE) {
          path.front().text = text1[x] + path.front().text;
        } else {
          path.prepend(Diff(DELETE, text1.mid(x, (x + 1) - (x))));
        }
        last_op = DELETE;
        break;
      } else if (v_map.value(d).contains(QPair<int, int>(x, y - 1))) {
        y--;
        if (last_op == INSERT) {
          path.front().text = text2[y] + path.front().text;
        } else {
          path.prepend(Diff(INSERT, text2.mid(y, (y + 1) - (y))));
        }
        last_op = INSERT;
        break;
      } else {
        x--;
        y--;
        if (text1[x] != text2[y]) {
          throw(QString("No diagonal.  Can't happen. (diff_path1)"));
        }
        if (last_op == EQUAL && !first) {
          path.front().text = text1[x] + path.front().text;
        } else {
          path.prepend(Diff(EQUAL, text1.mid(x, (x + 1) - (x))));
        }
        last_op = EQUAL;
      }
      first = false;
    }
  }
  return path;
}


QList<Diff> diff_match_patch::diff_path2(const QList<QSet<QPair<int, int> > > &v_map,
                                         const QString &text1, const QString &text2) {
  QList<Diff> path;
  int x = text1.length();
  int y = text2.length();
  Operation last_op = EQUAL;
  bool first = true;
  for (int d = v_map.size() - 2; d >= 0; d--) {
    while (true) {
      if (v_map.value(d).contains(QPair<int, int>(x - 1, y))) {
        x--;
        if (last_op == DELETE) {
          path.back().text += text1[text1.length() - x - 1];
        } else {
          path.append(Diff(DELETE,
              text1.mid(text1.length() - x - 1, (text1.length() - x) - (text1.length() - x - 1))));
        }
        last_op = DELETE;
        break;
      } else if (v_map.value(d).contains(QPair<int, int>(x, y - 1))) {
        y--;
        if (last_op == INSERT) {
          path.back().text += text2[text2.length() - y - 1];
        } else {
          path.append(Diff(INSERT,
              text2.mid(text2.length() - y - 1, (text2.length() - y) - (text2.length() - y - 1))));
        }
        last_op = INSERT;
        break;
      } else {
        x--;
        y--;

        if (text1[text1.length() - x - 1]
            != text2[text2.length() - y - 1]) {
          throw(QString("No diagonal.  Can't happen. (diff_path2)"));
        }
        if (last_op == EQUAL && !first) {
          path.back().text += text1[text1.length() - x - 1];
        } else {
          path.append(Diff(EQUAL,
              text1.mid(text1.length() - x - 1, (text1.length() - x) - (text1.length() - x - 1))));
        }
        last_op = EQUAL;
      }
    }
    first = false;
  }
  return path;
}


int diff_match_patch::diff_commonPrefix(const QString &text1, const QString &text2) {
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  int n = qMin(text1.length(), text2.length());
  for (int i = 0; i < n; i++) {
    if (text1[i] != text2[i]) {
      return i;
    }
  }
  return n;
}


int diff_match_patch::diff_commonSuffix(const QString &text1, const QString &text2) {
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  int n = qMin(text1.length(), text2.length());
  for (int i = 0; i < n; i++) {
    if (text1[text1.length() - i - 1]
        != text2[text2.length() - i - 1]) {
      return i;
    }
  }
  return n;
}


QStringList diff_match_patch::diff_halfMatch(const QString &text1, const QString &text2) {
  QString longtext = text1.length() > text2.length() ? text1 : text2;
  QString shorttext = text1.length() > text2.length() ? text2 : text1;
  if (longtext.length() < 10 || shorttext.length() < 1) {
    return QStringList();  // Pointless.
  }

  // First check if the second quarter is the seed for a half-match.
  QStringList hm1 = diff_halfMatchI(longtext, shorttext,
      (longtext.length() + 3) / 4);
  // Check again based on the third quarter.
  QStringList hm2 = diff_halfMatchI(longtext, shorttext,
      (longtext.length() + 1) / 2);
  QStringList hm;
  if (hm1.isEmpty() && hm2.isEmpty()) {
    return QStringList();
  } else if (hm2.isEmpty()) {
    hm = hm1;
  } else if (hm1.isEmpty()) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length() > hm2[4].length() ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  if (text1.length() > text2.length()) {
    return hm;
  } else {
    QStringList listRet;
    listRet << hm[2] << hm[3] << hm[0] << hm[1] << hm[4];
    return listRet;
  }
}


QStringList diff_match_patch::diff_halfMatchI(const QString &longtext, const QString &shorttext, int i) {
  // Start with a 1/4 length substring at position i as a seed.
  QString seed = longtext.mid(i, (i + (longtext.length() / 4)) - i);
  int j = -1;
  QString best_common;
  QString best_longtext_a, best_longtext_b;
  QString best_shorttext_a, best_shorttext_b;
  while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
    int prefixLength = diff_commonPrefix(longtext.mid(i), shorttext.mid(j));
    int suffixLength = diff_commonSuffix(longtext.mid(0, i), shorttext.mid(0, j));
    if (best_common.length() < suffixLength + prefixLength) {
      best_common = shorttext.mid(j - suffixLength, (j) - (j - suffixLength))
          + shorttext.mid(j, (j + prefixLength) - (j));
      best_longtext_a = longtext.mid(0, i - suffixLength);
      best_longtext_b = longtext.mid(i + prefixLength);
      best_shorttext_a = shorttext.mid(0, j - suffixLength);
      best_shorttext_b = shorttext.mid(j + prefixLength);
    }
  }
  if (best_common.length() >= longtext.length() / 2) {
    QStringList listRet;
    listRet << best_longtext_a << best_longtext_b << best_shorttext_a << best_shorttext_b << best_common;
    return listRet;
  } else {
    return QStringList();
  }
}


void diff_match_patch::diff_cleanupSemantic(QList<Diff> &diffs) {
  if (diffs.isEmpty()) {
    return;
  }
  bool changes = false;
  QStack<Diff> equalities;  // Stack of equalities.
  QString lastequality; // Always equal to equalities.lastElement().text
  QMutableListIterator<Diff> pointer(diffs);
  // Number of characters that changed prior to the equality.
  int length_changes1 = 0;
  // Number of characters that changed after the equality.
  int length_changes2 = 0;
  Diff *thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
  while (thisDiff != NULL) {
    if (thisDiff->operation == EQUAL) {
      // equality found
      equalities.push(*thisDiff);
      length_changes1 = length_changes2;
      length_changes2 = 0;
      lastequality = thisDiff->text;
    } else {
      // an insertion or deletion
      length_changes2 += thisDiff->text.length();
      if (!lastequality.isNull() && (lastequality.length() <= length_changes1)
          && (lastequality.length() <= length_changes2)) {
        //System.out.println("Splitting: '" + lastequality + "'");
        // Walk back to offending equality.
        while (*thisDiff != equalities.top()) {
          thisDiff = &pointer.previous();
        }
        pointer.next();

        // Replace equality with a delete.
        pointer.setValue(Diff(DELETE, lastequality));
        // Insert a corresponding an insert.
        pointer.insert(Diff(INSERT, lastequality));

        equalities.pop();  // Throw away the equality we just deleted.
        if (!equalities.isEmpty()) {
          // Throw away the previous equality (it needs to be reevaluated).
          equalities.pop();
        }
        if (equalities.isEmpty()) {
          // There are no previous equalities, walk back to the start.
          while (pointer.hasPrevious()) {
            pointer.previous();
          }
        } else {
          // There is a safe equality we can fall back to.
          thisDiff = &equalities.top();
          while (*thisDiff != pointer.previous()) {
            // Intentionally empty loop.
          }
        }

        length_changes1 = 0;  // Reset the counters.
        length_changes2 = 0;
        lastequality = QString();
        changes = true;
      }
    }
    thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
  }

  if (changes) {
    diff_cleanupMerge(diffs);
  }
  diff_cleanupSemanticLossless(diffs);
}


void diff_match_patch::diff_cleanupSemanticLossless(QList<Diff> &diffs) {
  QString equality1, edit, equality2;
  QString commonString;
  int commonOffset;
  int score, bestScore;
  QString bestEquality1, bestEdit, bestEquality2;
  // Create a new iterator at the start.
  QMutableListIterator<Diff> pointer(diffs);
  Diff *prevDiff = pointer.hasNext() ? &pointer.next() : NULL;
  Diff *thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
  Diff *nextDiff = pointer.hasNext() ? &pointer.next() : NULL;

  // Intentionally ignore the first and last element (don't need checking).
  while (nextDiff != NULL) {
    if (prevDiff->operation == EQUAL &&
      nextDiff->operation == EQUAL) {
        // This is a single edit surrounded by equalities.
        equality1 = prevDiff->text;
        edit = thisDiff->text;
        equality2 = nextDiff->text;

        // First, shift the edit as far left as possible.
        commonOffset = diff_commonSuffix(equality1, edit);
        if (commonOffset != 0) {
          commonString = edit.mid(edit.length() - commonOffset);
          equality1 = equality1.mid(0, equality1.length() - commonOffset);
          edit = commonString + edit.mid(0, edit.length() - commonOffset);
          equality2 = commonString + equality2;
        }

        // Second, step character by character right, looking for the best fit.
        bestEquality1 = equality1;
        bestEdit = edit;
        bestEquality2 = equality2;
        bestScore = diff_cleanupSemanticScore(equality1, edit)
            + diff_cleanupSemanticScore(edit, equality2);
        while (edit.length() != 0 && equality2.length() != 0
            && edit[0] == equality2[0]) {
          equality1 += edit[0];
          edit = edit.mid(1) + equality2[0];
          equality2 = equality2.mid(1);
          score = diff_cleanupSemanticScore(equality1, edit)
              + diff_cleanupSemanticScore(edit, equality2);
          // The >= encourages trailing rather than leading whitespace on edits.
          if (score >= bestScore) {
            bestScore = score;
            bestEquality1 = equality1;
            bestEdit = edit;
            bestEquality2 = equality2;
          }
        }

        if (prevDiff->text != bestEquality1) {
          // We have an improvement, save it back to the diff.
          if (bestEquality1.length() != 0) {
            prevDiff->text = bestEquality1;
          } else {
            pointer.previous(); // Walk past nextDiff.
            pointer.previous(); // Walk past thisDiff.
            pointer.previous(); // Walk past prevDiff.
            pointer.remove(); // Delete prevDiff.
            pointer.next(); // Walk past thisDiff.
            pointer.next(); // Walk past nextDiff.
          }
          thisDiff->text = bestEdit;
          if (bestEquality2.length() != 0) {
            nextDiff->text = bestEquality2;
          } else {
            pointer.remove(); // Delete nextDiff.
            nextDiff = thisDiff;
            thisDiff = prevDiff;
          }
        }
    }
    prevDiff = thisDiff;
    thisDiff = nextDiff;
    nextDiff = pointer.hasNext() ? &pointer.next() : NULL;
  }
}


int diff_match_patch::diff_cleanupSemanticScore(const QString &one, const QString &two) {
  if (one.length() == 0 || two.length() == 0) {
    // Edges are the best.
    return 10;
  }

  // Each port of this function behaves slightly differently due to
  // subtle differences in each language's definition of things like
  // 'whitespace'.  Since this function's purpose is largely cosmetic,
  // the choice has been made to use each language's native features
  // rather than force total conformity.
  int score = 0;
  // One point for non-alphanumeric.
  if (!one[one.length() - 1].isLetterOrNumber()
      || !two[0].isLetterOrNumber()) {
    score++;
    // Two points for whitespace.
    if (one[one.length() - 1].isSpace() || two[0].isSpace()) {
      score++;
      // Three points for line breaks.
      if (one[one.length() - 1].category() == QChar::Other_Control
          || two[0].category() == QChar::Other_Control) {
        score++;
        // Four points for blank lines.
        QRegExp blankLineEnd("\\n\\r?\\n$");
        QRegExp blankLineStart("^\\r?\\n\\r?\\n");
        if (blankLineEnd.indexIn(one) != -1
            || blankLineStart.indexIn(two) != -1) {
          score++;
        }
      }
    }
  }
  return score;
}


void diff_match_patch::diff_cleanupEfficiency(QList<Diff> &diffs) {
  if (diffs.isEmpty()) {
    return;
  }
  bool changes = false;
  QStack<Diff> equalities;  // Stack of equalities.
  QString lastequality; // Always equal to equalities.lastElement().text
  QMutableListIterator<Diff> pointer(diffs);
  // Is there an insertion operation before the last equality.
  bool pre_ins = false;
  // Is there a deletion operation before the last equality.
  bool pre_del = false;
  // Is there an insertion operation after the last equality.
  bool post_ins = false;
  // Is there a deletion operation after the last equality.
  bool post_del = false;

  Diff *thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
  Diff *safeDiff = thisDiff;

  while (thisDiff != NULL) {
    if (thisDiff->operation == EQUAL) {
      // equality found
      if (thisDiff->text.length() < Diff_EditCost && (post_ins || post_del)) {
        // Candidate found.
        equalities.push(*thisDiff);
        pre_ins = post_ins;
        pre_del = post_del;
        lastequality = thisDiff->text;
      } else {
        // Not a candidate, and can never become one.
        equalities.clear();
        lastequality = QString();
        safeDiff = thisDiff;
      }
      post_ins = post_del = false;
    } else {
      // an insertion or deletion
      if (thisDiff->operation == DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }
      /*
      * Five types to be split:
      * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
      * <ins>A</ins>X<ins>C</ins><del>D</del>
      * <ins>A</ins><del>B</del>X<ins>C</ins>
      * <ins>A</del>X<ins>C</ins><del>D</del>
      * <ins>A</ins><del>B</del>X<del>C</del>
      */
      if (!lastequality.isNull()
          && ((pre_ins && pre_del && post_ins && post_del)
          || ((lastequality.length() < Diff_EditCost / 2)
          && ((pre_ins ? 1 : 0) + (pre_del ? 1 : 0)
          + (post_ins ? 1 : 0) + (post_del ? 1 : 0)) == 3))) {
        //System.out.println("Splitting: '" + lastequality + "'");
        // Walk back to offending equality.
        while (*thisDiff != equalities.top()) {
          thisDiff = &pointer.previous();
        }
        pointer.next();

        // Replace equality with a delete.
        pointer.setValue(Diff(DELETE, lastequality));
        // Insert a corresponding an insert.
        pointer.insert(Diff(INSERT, lastequality));
        thisDiff = &pointer.previous();
        pointer.next();

        equalities.pop();  // Throw away the equality we just deleted.
        lastequality = QString();
        if (pre_ins && pre_del) {
          // No changes made which could affect previous entry, keep going.
          post_ins = post_del = true;
          equalities.clear();
          safeDiff = thisDiff;
        } else {
          if (!equalities.isEmpty()) {
            // Throw away the previous equality (it needs to be reevaluated).
            equalities.pop();
          }
          if (equalities.isEmpty()) {
            // There are no previous questionable equalities,
            // walk back to the last known safe diff.
            thisDiff = safeDiff;
          } else {
            // There is an equality we can fall back to.
            thisDiff = &equalities.top();
          }
          while (*thisDiff != pointer.previous()) {
            // Intentionally empty loop.
          }
          post_ins = post_del = false;
        }

        changes = true;
      }
    }
    thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
  }

  if (changes) {
    diff_cleanupMerge(diffs);
  }
}


void diff_match_patch::diff_cleanupMerge(QList<Diff> &diffs) {
  diffs.append(Diff(EQUAL, ""));  // Add a dummy entry at the end.
  QMutableListIterator<Diff> pointer(diffs);
  int count_delete = 0;
  int count_insert = 0;
  QString text_delete = "";
  QString text_insert = "";
  Diff *thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
  Diff *prevEqual = NULL;
  int commonlength;
  while (thisDiff != NULL) {
    switch (thisDiff->operation) {
      case INSERT:
        count_insert++;
        text_insert += thisDiff->text;
        prevEqual = NULL;
        break;
      case DELETE:
        count_delete++;
        text_delete += thisDiff->text;
        prevEqual = NULL;
        break;
      case EQUAL:
        if (count_delete != 0 || count_insert != 0) {
          // Delete the offending records.
          pointer.previous();  // Reverse direction.
          while (count_delete-- > 0) {
            pointer.previous();
            pointer.remove();
          }
          while (count_insert-- > 0) {
            pointer.previous();
            pointer.remove();
          }
          if (count_delete != 0 && count_insert != 0) {
            // Factor out any common prefixies.
            commonlength = diff_commonPrefix(text_insert, text_delete);
            if (commonlength != 0) {
              if (pointer.hasPrevious()) {
                thisDiff = &pointer.previous();
                if (thisDiff->operation != EQUAL)
                  throw(QString("Previous diff should have been an equality."));
                thisDiff->text += text_insert.mid(0, commonlength);
                pointer.next();
              } else {
                pointer.insert(Diff(EQUAL, text_insert.mid(0, commonlength)));
              }
              text_insert = text_insert.mid(commonlength);
              text_delete = text_delete.mid(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength != 0) {
              thisDiff = &pointer.next();
              thisDiff->text = text_insert.mid(text_insert.length()
                  - commonlength) + thisDiff->text;
              text_insert = text_insert.left(text_insert.length()
                  - commonlength);
              text_delete = text_delete.left(text_delete.length()
                  - commonlength);
              pointer.previous();
            }
          }
          // Insert the merged records.
          if (text_delete.length() != 0) {
            pointer.insert(Diff(DELETE, text_delete));
          }
          if (text_insert.length() != 0) {
            pointer.insert(Diff(INSERT, text_insert));
          }
          // Step forward to the equality.
          thisDiff = pointer.hasNext() ? &pointer.next() : NULL;

        } else if (prevEqual != NULL) {
          // Merge this equality with the previous one.
          prevEqual->text += thisDiff->text;
          pointer.remove();
          thisDiff = &pointer.previous();
          pointer.next();  // Forward direction
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = "";
        text_insert = "";
        prevEqual = thisDiff;
        break;
      }
      thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
  }
  // System.out.println(diff);
  if (diffs.back().text.length() == 0) {
    diffs.removeLast();  // Remove the dummy entry at the end.
  }

  /*
  * Second pass: look for single edits surrounded on both sides by equalities
  * which can be shifted sideways to eliminate an equality.
  * e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  */
  bool changes = false;
  // Create a new iterator at the start.
  // (As opposed to walking the current one back.)
  pointer.toFront();
  Diff *prevDiff = pointer.hasNext() ? &pointer.next() : NULL;
  thisDiff = pointer.hasNext() ? &pointer.next() : NULL;
  Diff *nextDiff = pointer.hasNext() ? &pointer.next() : NULL;

  // Intentionally ignore the first and last element (don't need checking).
  while (nextDiff != NULL) {
    if (prevDiff->operation == EQUAL &&
      nextDiff->operation == EQUAL) {
        // This is a single edit surrounded by equalities.
        if (thisDiff->text.endsWith(prevDiff->text)) {
          // Shift the edit over the previous equality.
          thisDiff->text = prevDiff->text
              + thisDiff->text.mid(0, thisDiff->text.length()
              - prevDiff->text.length());
          nextDiff->text = prevDiff->text + nextDiff->text;
          pointer.previous(); // Walk past nextDiff.
          pointer.previous(); // Walk past thisDiff.
          pointer.previous(); // Walk past prevDiff.
          pointer.remove(); // Delete prevDiff.
          pointer.next(); // Walk past thisDiff.
          thisDiff = &pointer.next(); // Walk past nextDiff.
          nextDiff = pointer.hasNext() ? &pointer.next() : NULL;
          changes = true;
        } else if (thisDiff->text.startsWith(nextDiff->text)) {
          // Shift the edit over the next equality.
          prevDiff->text += nextDiff->text;
          thisDiff->text = thisDiff->text.mid(nextDiff->text.length())
              + nextDiff->text;
          pointer.remove(); // Delete nextDiff.
          nextDiff = pointer.hasNext() ? &pointer.next() : NULL;
          changes = true;
        }
    }
    prevDiff = thisDiff;
    thisDiff = nextDiff;
    nextDiff = pointer.hasNext() ? &pointer.next() : NULL;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    diff_cleanupMerge(diffs);
  }
}


int diff_match_patch::diff_xIndex(const QList<Diff> &diffs, int loc) {
  int chars1 = 0;
  int chars2 = 0;
  int last_chars1 = 0;
  int last_chars2 = 0;
  Diff lastDiff;
  foreach (Diff aDiff, diffs) {
    if (aDiff.operation != INSERT) {
      // Equality or deletion.
      chars1 += aDiff.text.length();
    }
    if (aDiff.operation != DELETE) {
      // Equality or insertion.
      chars2 += aDiff.text.length();
    }
    if (chars1 > loc) {
      // Overshot the location.
      lastDiff = aDiff;
      break;
    }
    last_chars1 = chars1;
    last_chars2 = chars2;
  }
  if (lastDiff.operation == DELETE) {
    // The location was deleted.
    return last_chars2;
  }
  // Add the remaining character length.
  return last_chars2 + (loc - last_chars1);
}


QString diff_match_patch::diff_prettyHtml(const QList<Diff> &diffs) {
  QString html;
  QString text;
  int i = 0;
  foreach (Diff aDiff, diffs) {
    text = aDiff.text;
    text.replace("&", "&amp;").replace("<", "&lt;")
        .replace(">", "&gt;").replace("\n", "&para;<BR>");
    switch (aDiff.operation) {
      case INSERT:
        html += QString("<INS STYLE=\"background:#E6FFE6;\" TITLE=\"i=")
            + QString::number(i) + QString("\">") + text + QString("</INS>");
        break;
      case DELETE:
        html += QString("<DEL STYLE=\"background:#FFE6E6;\" TITLE=\"i=")
            + QString::number(i) + QString("\">") + text + QString("</DEL>");
        break;
      case EQUAL:
        html += QString("<SPAN TITLE=\"i=") + QString::number(i) + QString("\">") + text
            + QString("</SPAN>");
        break;
    }
    if (aDiff.operation != DELETE) {
      i += aDiff.text.length();
    }
  }
  return html;
}


QString diff_match_patch::diff_text1(const QList<Diff> &diffs) {
  QString txt;
  foreach (Diff aDiff, diffs) {
    if (aDiff.operation != INSERT) {
      txt += aDiff.text;
    }
  }
  return txt;
}


QString diff_match_patch::diff_text2(const QList<Diff> &diffs) {
  QString txt;
  foreach (Diff aDiff, diffs) {
    if (aDiff.operation != DELETE) {
      txt += aDiff.text;
    }
  }
  return txt;
}


QString diff_match_patch::diff_toDelta(const QList<Diff> &diffs) {
  QString txt;
  foreach (Diff aDiff, diffs) {
    switch (aDiff.operation) {
      case INSERT: {
        QString encoded = QString(QUrl::toPercentEncoding(aDiff.text, " !~*'();/?:@&=+$,#"));
        txt += QString("+") + encoded + QString("\t");
        break;
      }
      case DELETE:
        txt += QString("-") + QString::number(aDiff.text.length()) + QString("\t");
        break;
      case EQUAL:
        txt += QString("=") + QString::number(aDiff.text.length()) + QString("\t");
        break;
    }
  }
  if (txt.length() != 0) {
    // Strip off trailing tab character.
    txt = txt.mid(0, txt.length() - 1);
  }
  return txt;
}


QList<Diff> diff_match_patch::diff_fromDelta(const QString &text1, const QString &delta) {
  QList<Diff> diffs;
  int pointer = 0;  // Cursor in text1
  QStringList tokens = delta.split("\t");
  foreach (QString token, tokens) {
    if (token.length() == 0) {
      // Blank tokens are ok (from a trailing \t).
      continue;
    }
    // Each token begins with a one character parameter which specifies the
    // operation of this token (delete, insert, equality).
    QString param = token.mid(1);
    switch (token[0].toAscii()) {
      case '+':
        param = QUrl::fromPercentEncoding(qPrintable(param));
        diffs.append(Diff(INSERT, param));
        break;
      case '-':
        // Fall through.
      case '=': {
        int n;
        n = param.toInt();
        if (n < 0) {
          throw(QString("Negative number in diff_fromDelta: %1").arg(param));
        }
        QString text;
        text = text1.mid(pointer, (pointer + n) - (pointer));
        pointer += n;
        if (token[0] == QChar('=')) {
          diffs.append(Diff(EQUAL, text));
        } else {
          diffs.append(Diff(DELETE, text));
        }
        break;
      }
      default:
        throw(QString("Invalid diff operation in diff_fromDelta: %1").arg(token[0]));
    }
  }
  if (pointer != text1.length()) {
    throw(QString("Delta length (%1) smaller than source text length (%2)").arg(pointer).arg(text1.length()));
  }
  return diffs;
}


  //  MATCH FUNCTIONS


int diff_match_patch::match_main(const QString &text, const QString &pattern, int loc) {
  loc = qMax(0, qMin(loc, text.length() - pattern.length()));
  if (text == pattern) {
    // Shortcut (potentially not guaranteed by the algorithm)
    return 0;
  } else if (text.length() == 0) {
    // Nothing to match.
    return -1;
  } else if (text.mid(loc, (loc + pattern.length()) - (loc)) == pattern) {
    // Perfect match at the perfect spot!  (Includes case of null pattern)
    return loc;
  } else {
    // Do a fuzzy compare.
    return match_bitap(text, pattern, loc);
  }
}


int diff_match_patch::match_bitap(const QString &text, const QString &pattern, int loc) {
  if (!(Match_MaxBits == 0 || pattern.length() <= Match_MaxBits)) {
    throw(QString("Pattern too long for this application."));
  }

  // Initialise the alphabet.
  QMap<QChar, int> s = match_alphabet(pattern);

  int score_text_length = text.length();
  // Coerce the text length between reasonable maximums and minimums.
  score_text_length = qMax(score_text_length, Match_MinLength);
  score_text_length = qMin(score_text_length, Match_MaxLength);

  // Highest score beyond which we give up.
  double score_threshold = Match_Threshold;
  // Is there a nearby exact match? (speedup)
  int best_loc = text.indexOf(pattern, loc);
  if (best_loc != -1) {
    score_threshold = qMin(match_bitapScore(0, best_loc, loc,
        score_text_length, pattern), score_threshold);
  }
  // What about in the other direction? (speedup)
  best_loc = text.lastIndexOf(pattern, loc + pattern.length());
  if (best_loc != -1) {
    score_threshold = qMin(match_bitapScore(0, best_loc, loc,
        score_text_length, pattern), score_threshold);
  }

  // Initialise the bit arrays.
  int matchmask = 1 << (pattern.length() - 1);
  best_loc = -1;

  int bin_min, bin_mid;
  int bin_max = qMax(loc + loc, text.length());
  // Empty initialization added to appease Java compiler.
  QVector<int> last_rd;
  QVector<int> rd;
  for (int d = 0; d < pattern.length(); d++) {
    // Scan for the best match; each iteration allows for one more error.
    rd = QVector<int>(text.length());

    // Run a binary search to determine how far from 'loc' we can stray at
    // this error level.
    bin_min = loc;
    bin_mid = bin_max;
    while (bin_min < bin_mid) {
      if (match_bitapScore(d, bin_mid, loc, score_text_length, pattern) < score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }
      bin_mid = (bin_max - bin_min) / 2 + bin_min;
    }
    // Use the result from this iteration as the maximum for the next.
    bin_max = bin_mid;
    int start = qMax(0, loc - (bin_mid - loc) - 1);
    int finish = qMin(text.length() - 1, pattern.length() + bin_mid);

    if (text[finish] == pattern[pattern.length() - 1]) {
      rd[finish] = (1 << (d + 1)) - 1;
    } else {
      rd[finish] = (1 << d) - 1;
    }
    for (int j = finish - 1; j >= start; j--) {
      if (d == 0) {
        // First pass: exact match.
        rd[j] = ((rd[j + 1] << 1) | 1) & (s.contains(text[j])
            ? s.value(text[j])
            : 0);
      } else {
        // Subsequent passes: fuzzy match.
        rd[j] =
            (((rd[j + 1] << 1) | 1)
            & (s.contains(text[j]) ? s.value(text[j]) : 0))
            | ((last_rd[j + 1] << 1) | 1)
            | ((last_rd[j] << 1) | 1)
            | last_rd[j + 1];
      }
      if ((rd[j] & matchmask) != 0) {
        double score = match_bitapScore(d, j, loc, score_text_length, pattern);
        // This match will almost certainly be better than any existing
        // match.  But check anyway.
        if (score <= score_threshold) {
          // Told you so.
          score_threshold = score;
          best_loc = j;
          if (j > loc) {
            // When passing loc, don't exceed our current distance from loc.
            start = qMax(0, loc - (j - loc));
          } else {
            // Already passed loc, downhill from here on in.
            break;
          }
        }
      }
    }
    if (match_bitapScore(d + 1, loc, loc, score_text_length, pattern) > score_threshold) {
      // No hope for a (better) match at greater error levels.
      break;
    }
    last_rd = rd;
  }
  return best_loc;
}


double diff_match_patch::match_bitapScore(int e, int x, int loc, int score_text_length, const QString &pattern) {
  int d = qAbs(loc - x);
  return (e / (float) pattern.length() / Match_Balance)
      + (d / (float) score_text_length / (1.0 - Match_Balance));
}


QMap<QChar, int> diff_match_patch::match_alphabet(const QString &pattern) {
  QMap<QChar, int> s;
  int i;
  for (i = 0; i < pattern.length(); i++) {
    QChar c = pattern[i];
    s.insert(c, 0);
  }
  for (i = 0; i < pattern.length(); i++) {
    QChar c = pattern[i];
    s.insert(c, s.value(c) | (1 << (pattern.length() - i - 1)));
  }
  return s;
}


 //  PATCH FUNCTIONS


void diff_match_patch::patch_addContext(Patch &patch, const QString &text) {
  QString pattern = text.mid(patch.start2, (patch.start2 + patch.length1) - (patch.start2));
  int padding = 0;
  // Increase the context until we're unique (but don't let the pattern
  // expand beyond Match_MaxBits).
  if (text.length() != 0) {
    // Bug in QString:
    // QString("").indexOf(QString("")) == 0
    // QString("").lastIndexOf(QString("")) == -1
    while (text.indexOf(pattern) != text.lastIndexOf(pattern)
        && pattern.length() < Match_MaxBits - Patch_Margin - Patch_Margin) {
      padding += Patch_Margin;
      pattern = text.mid(qMax(0, patch.start2 - padding),
          qMin(text.length(), patch.start2 + patch.length1 + padding) - qMax(0, patch.start2 - padding));
    }
  }
  // Add one chunk for good luck.
  padding += Patch_Margin;
  // Add the prefix.
  QString prefix = text.mid(qMax(0, patch.start2 - padding),
      patch.start2 - qMax(0, patch.start2 - padding));
  if (prefix.length() != 0) {
    patch.diffs.prepend(Diff(EQUAL, prefix));
  }
  // Add the suffix.
  QString suffix = text.mid(patch.start2 + patch.length1,
      qMin(text.length(), patch.start2 + patch.length1 + padding)
      - (patch.start2 + patch.length1));
  if (suffix.length() != 0) {
    patch.diffs.append(Diff(EQUAL, suffix));
  }

  // Roll back the start points.
  patch.start1 -= prefix.length();
  patch.start2 -= prefix.length();
  // Extend the lengths.
  patch.length1 += prefix.length() + suffix.length();
  patch.length2 += prefix.length() + suffix.length();
}


QList<Patch> diff_match_patch::patch_make(const QString &text1, const QString &text2) {
  // No diffs provided, compute our own.
  QList<Diff> diffs = diff_main(text1, text2, true);

  if (diffs.size() > 2) {
    diff_cleanupSemantic(diffs);
    diff_cleanupEfficiency(diffs);
  }

  return patch_make(text1, text2, diffs);
}


QList<Patch> diff_match_patch::patch_make(const QList<Diff> &diffs) {
  // No orgin strings provided, compute our own.
  QString text1 = diff_text1(diffs);
  QString text2;  // text2 isn't actually used.
  return patch_make(text1, text2, diffs);
}


QList<Patch> diff_match_patch::patch_make(const QString &text1, const QString &text2,
                                          const QList<Diff> &diffs) {
  QList<Patch> patches;
  if (diffs.isEmpty()) {
    return patches;  // Get rid of the null case.
  }
  Patch patch;
  int char_count1 = 0;  // Number of characters into the text1 string.
  int char_count2 = 0;  // Number of characters into the text2 string.
  // Recreate the patches to determine context info.
  QString prepatch_text = text1;
  QString postpatch_text = text1;
  foreach (Diff aDiff, diffs) {
    if (patch.diffs.isEmpty() && aDiff.operation != EQUAL) {
      // A new patch starts here.
      patch.start1 = char_count1;
      patch.start2 = char_count2;
    }

    switch (aDiff.operation) {
      case INSERT:
        patch.diffs.append(aDiff);
        patch.length2 += aDiff.text.length();
        postpatch_text = postpatch_text.left(char_count2)
            + aDiff.text + postpatch_text.mid(char_count2);
        break;
      case DELETE:
        patch.length1 += aDiff.text.length();
        patch.diffs.append(aDiff);
        postpatch_text = postpatch_text.left(char_count2)
            + postpatch_text.mid(char_count2 + aDiff.text.length());
        break;
      case EQUAL:
        if (aDiff.text.length() <= 2 * Patch_Margin
            && !patch.diffs.isEmpty() && !(aDiff == diffs.back())) {
          // Small equality inside a patch.
          patch.diffs.append(aDiff);
          patch.length1 += aDiff.text.length();
          patch.length2 += aDiff.text.length();
        }

        if (aDiff.text.length() >= 2 * Patch_Margin) {
          // Time for a new patch.
          if (!patch.diffs.isEmpty()) {
            patch_addContext(patch, prepatch_text);
            patches.append(patch);
            patch = Patch();
            prepatch_text = postpatch_text;
          }
        }
        break;
    }

    // Update the current character count.
    if (aDiff.operation != INSERT) {
      char_count1 += aDiff.text.length();
    }
    if (aDiff.operation != DELETE) {
      char_count2 += aDiff.text.length();
    }

  }
  // Pick up the leftover patch if not empty.
  if (!patch.diffs.isEmpty()) {
    patch_addContext(patch, prepatch_text);
    patches.append(patch);
  }

  return patches;

  Q_UNUSED(text2)
}


QPair<QString,QVector<bool> > diff_match_patch::patch_apply(QList<Patch> &patches, const QString &sourceText) {
  QString text = sourceText;  // Copy to preserve original.
  if (patches.isEmpty()) {
    return QPair<QString,QVector<bool> >(text, QVector<bool>(0));
  }

  // Deep copy the patches so that no changes are made to originals.
  QList<Patch> patchesCopy;
  foreach (Patch aPatch, patches) {
    Patch patchCopy = Patch();
    foreach (Diff aDiff, aPatch.diffs) {
      Diff diffCopy = Diff(aDiff.operation, aDiff.text);
      patchCopy.diffs.append(diffCopy);
    }
    patchCopy.start1 = aPatch.start1;
    patchCopy.start2 = aPatch.start2;
    patchCopy.length1 = aPatch.length1;
    patchCopy.length2 = aPatch.length2;
    patchesCopy.append(patchCopy);
  }

  QString nullPadding = patch_addPadding(patchesCopy);
  text = nullPadding + text + nullPadding;
  patch_splitMax(patchesCopy);

  int x = 0;
  // delta keeps track of the offset between the expected and actual location
  // of the previous patch.  If there are patches expected at positions 10 and
  // 20, but the first patch was found at 12, delta is 2 and the second patch
  // has an effective expected position of 22.
  int delta = 0;
  QVector<bool> results(patchesCopy.size());
  int expected_loc, start_loc;
  QString text1, text2;
  QList<Diff> diffs;
  int index1, index2;
  foreach (Patch aPatch, patchesCopy) {
    expected_loc = aPatch.start2 + delta;
    text1 = diff_text1(aPatch.diffs);
    start_loc = match_main(text, text1, expected_loc);
    if (start_loc == -1) {
      // No match found.  :(
      results[x] = false;
    } else {
      // Found a match.  :)
      results[x] = true;
      delta = start_loc - expected_loc;
      text2 = text.mid(start_loc,
          qMin((start_loc + text1.length()) - start_loc, text.length()));
      if (text1 == text2) {
        // Perfect match, just shove the replacement text in.
        text = text.left(start_loc) + diff_text2(aPatch.diffs)
            + text.mid(start_loc + text1.length());
      } else {
        // Imperfect match.  Run a diff to get a framework of equivalent
        // indicies.
        diffs = diff_main(text1, text2, false);
        diff_cleanupSemanticLossless(diffs);
        index1 = 0;
        foreach (Diff aDiff, aPatch.diffs) {
          if (aDiff.operation != EQUAL) {
            index2 = diff_xIndex(diffs, index1);
            if (aDiff.operation == INSERT) {
              // Insertion
              text = text.left(start_loc + index2) + aDiff.text
                  + text.mid(start_loc + index2);
            } else if (aDiff.operation == DELETE) {
              // Deletion
              text = text.left(start_loc + index2)
                  + text.mid(start_loc + diff_xIndex(diffs,
                  index1 + aDiff.text.length()));
            }
          }
          if (aDiff.operation != DELETE) {
            index1 += aDiff.text.length();
          }
        }
      }
    }
    x++;
  }
  // Strip the padding off.
  text = text.mid(nullPadding.length(), text.length()
      - 2 * nullPadding.length());
  return QPair<QString,QVector<bool> >(text, results);
}


QString diff_match_patch::patch_addPadding(QList<Patch> &patches) {
  QString nullPadding = "";
  for (int x = 0; x < Patch_Margin; x++) {
    nullPadding += QChar((ushort)x);
  }

  // Bump all the patches forward.
  QMutableListIterator<Patch> pointer(patches);
  while (pointer.hasNext()) {
    Patch &aPatch = pointer.next();
    aPatch.start1 += nullPadding.length();
    aPatch.start2 += nullPadding.length();
  }

  // Add some padding on start of first diff.
  Patch &firstPatch = patches.first();
  QList<Diff> &firstPatchDiffs = firstPatch.diffs;
  if (firstPatchDiffs.empty() || firstPatchDiffs.first().operation != EQUAL) {
    // Add nullPadding equality.
    firstPatchDiffs.prepend(Diff(EQUAL, nullPadding));
    firstPatch.start1 -= nullPadding.length();  // Should be 0.
    firstPatch.start2 -= nullPadding.length();  // Should be 0.
    firstPatch.length1 += nullPadding.length();
    firstPatch.length2 += nullPadding.length();
  } else if (nullPadding.length() > firstPatchDiffs.first().text.length()) {
    // Grow first equality.
    Diff &firstDiff = firstPatchDiffs.first();
    int extraLength = nullPadding.length() - firstDiff.text.length();
    firstDiff.text = nullPadding.mid(firstDiff.text.length(),
        nullPadding.length() - firstDiff.text.length()) + firstDiff.text;
    firstPatch.start1 -= extraLength;
    firstPatch.start2 -= extraLength;
    firstPatch.length1 += extraLength;
    firstPatch.length2 += extraLength;
  }

  // Add some padding on end of last diff.
  Patch &lastPatch = patches.first();
  QList<Diff> &lastPatchDiffs = lastPatch.diffs;
  if (lastPatchDiffs.empty() || lastPatchDiffs.last().operation != EQUAL) {
    // Add nullPadding equality.
    lastPatchDiffs.append(Diff(EQUAL, nullPadding));
    lastPatch.length1 += nullPadding.length();
    lastPatch.length2 += nullPadding.length();
  } else if (nullPadding.length() > lastPatchDiffs.last().text.length()) {
    // Grow last equality.
    Diff &lastDiff = lastPatchDiffs.last();
    int extraLength = nullPadding.length() - lastDiff.text.length();
    lastDiff.text += nullPadding.mid(0, extraLength);
    lastPatch.length1 += extraLength;
    lastPatch.length2 += extraLength;
  }

  return nullPadding;
}


void diff_match_patch::patch_splitMax(QList<Patch> &patches) {
  int patch_size;
  QString precontext, postcontext;
  Patch patch;
  int start1, start2;
  bool empty;
  Operation diff_type;
  QString diff_text;
  QMutableListIterator<Patch> pointer(patches);
  Patch bigpatch;

  if (pointer.hasNext()) {
    bigpatch = pointer.next();
  }

  while (!bigpatch.isNull()) {
    if (bigpatch.length1 <= Match_MaxBits) {
      bigpatch = pointer.hasNext() ? pointer.next() : Patch();
      continue;
    }
    // Remove the big old patch.
    pointer.remove();
    patch_size = Match_MaxBits;
    start1 = bigpatch.start1;
    start2 = bigpatch.start2;
    precontext = "";
    while (!bigpatch.diffs.isEmpty()) {
      // Create one of several smaller patches.
      patch = Patch();
      empty = true;
      patch.start1 = start1 - precontext.length();
      patch.start2 = start2 - precontext.length();
      if (precontext.length() != 0) {
        patch.length1 = patch.length2 = precontext.length();
        patch.diffs.append(Diff(EQUAL, precontext));
      }
      while (!bigpatch.diffs.isEmpty()
          && patch.length1 < patch_size - Patch_Margin) {
        diff_type = bigpatch.diffs.front().operation;
        diff_text = bigpatch.diffs.front().text;
        if (diff_type == INSERT) {
          // Insertions are harmless.
          patch.length2 += diff_text.length();
          start2 += diff_text.length();
          patch.diffs.append(bigpatch.diffs.front());
          bigpatch.diffs.removeFirst();
          empty = false;
        } else {
          // Deletion or equality.  Only take as much as we can stomach.
          diff_text = diff_text.left(qMin(diff_text.length(),
              patch_size - patch.length1 - Patch_Margin));
          patch.length1 += diff_text.length();
          start1 += diff_text.length();
          if (diff_type == EQUAL) {
            patch.length2 += diff_text.length();
            start2 += diff_text.length();
          } else {
            empty = false;
          }
          patch.diffs.append(Diff(diff_type, diff_text));
          if (diff_text == bigpatch.diffs.front().text) {
            bigpatch.diffs.removeFirst();
          } else {
            bigpatch.diffs.front().text = bigpatch.diffs.front().text
                .mid(diff_text.length());
          }
        }
      }
      // Compute the head context for the next patch.
      precontext = diff_text2(patch.diffs);
      precontext = precontext.mid(qMax(0, precontext.length() - Patch_Margin));
      // Append the end context for this patch.
      if (diff_text1(bigpatch.diffs).length() > Patch_Margin) {
        postcontext = diff_text1(bigpatch.diffs).left(Patch_Margin);
      } else {
        postcontext = diff_text1(bigpatch.diffs);
      }
      if (postcontext.length() != 0) {
        patch.length1 += postcontext.length();
        patch.length2 += postcontext.length();
        if (!patch.diffs.isEmpty()
            && patch.diffs.back().operation == EQUAL) {
          patch.diffs.back().text += postcontext;
        } else {
          patch.diffs.append(Diff(EQUAL, postcontext));
        }
      }
      if (!empty) {
        pointer.insert(patch);
      }
    }
    bigpatch = pointer.hasNext() ? pointer.next() : Patch();
  }
}


QString diff_match_patch::patch_toText(const QList<Patch> &patches) {
  QString text;
  foreach (Patch aPatch, patches) {
    text.append(aPatch.toString());
  }
  return text;
}


QList<Patch> diff_match_patch::patch_fromText(const QString &textline) {
  QList<Patch> patches;
  if (textline.length() == 0) {
    return patches;
  }
  QStringList text = textline.split("\n", QString::SkipEmptyParts);
  Patch patch;
  QRegExp patchHeader("^@@ -(\\d+),?(\\d*) \\+(\\d+),?(\\d*) @@$");
  char sign;
  QString line;
  while (!text.isEmpty()) {
    if (!patchHeader.exactMatch(text.front())) {
      throw(QString("Invalid patch string: %1").arg(text.front()));
    }

    patch = Patch();
    patch.start1 = patchHeader.cap(1).toInt();
    if (patchHeader.cap(2).length() == 0) {
      patch.start1--;
      patch.length1 = 1;
    } else if (patchHeader.cap(2) == "0") {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = patchHeader.cap(2).toInt();
    }

    patch.start2 = patchHeader.cap(3).toInt();
    if (patchHeader.cap(4).length() == 0) {
      patch.start2--;
      patch.length2 = 1;
    } else if (patchHeader.cap(4) == "0") {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = patchHeader.cap(4).toInt();
    }
    text.removeFirst();

    while (!text.isEmpty()) {
      if (text.front().isEmpty()) {
        text.removeFirst();
        continue;
      }
      sign = text.front()[0].toAscii();
      line = text.front().mid(1);
      line = line.replace("+", "%2B");  // decode would change all "+" to " "
      line = QUrl::fromPercentEncoding(qPrintable(line));
      if (sign == '-') {
        // Deletion.
        patch.diffs.append(Diff(DELETE, line));
      } else if (sign == '+') {
        // Insertion.
        patch.diffs.append(Diff(INSERT, line));
      } else if (sign == ' ') {
        // Minor equality.
        patch.diffs.append(Diff(EQUAL, line));
      } else if (sign == '@') {
        // Start of next patch.
        break;
      } else {
        // WTF?
        throw(QString("Invalid patch mode '%1' in: %2").arg(sign).arg(line));
        return QList<Patch>();
      }
      text.removeFirst();
    }

    patches.append(patch);

  }
  return patches;
}
