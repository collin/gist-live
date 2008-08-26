require 'gen'
require 'legs'
require 'uuid'
require 'ostruct'

Legs.start do
  def initialize
    @documents = {}
    @editors = {}
    @owners = {}
  end

  def begin_editing data, file_name
    document = OpenStruct.new :name = file_name
      :id => UUID.new, :data => data
    
    @documents[document.id] = document
    @editors[document.id] = [self]
    @owners[document.id] = self
    
    document
  end

  def also_edit document_id
    document = @documents[document_id]
    @editors[document_id] << self
    document
  end
  
  def stop_editing document_id, reason="saved"
    return false unless @owners[document_id] == self
    for editor in @editors[document_id] - [self]
      editor.notify!(:stopped, reason)
    end
    true
  end
  
  
  def diff document_id, patch
    for editor in @editors[document_id] - [self]
      editor.notify! :patch, patch
    end
    true
  end
  
  private
  def log?; true end
end

sleep
