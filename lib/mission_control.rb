require 'gen'
require 'legs'
require 'uuid'
require 'ostruct'

Legs.start do
  def begin_editing data, file_name
    document = OpenStruct.new :name => file_name,
      :uuid => UUID.new, :data => data
    
    @documents[document.uuid] = document
    @editors[document.uuid] = [@caller]
    @owners[document.uuid] = @caller
    
    @caller.notify! :uuid, document.uuid
    true
  end

  def also_editing document_id
    document = @documents[document_id]
    @editors[document_id] << @caller
    @caller.notify! :edit, document.send(:table)
    true
  end
  
  def stop_editing document_id, reason="saved"
    return :false unless @owners[document_id] == @caller
    for editor in (@editors[document_id] - [@caller])
      editor.notify!(:stopped, reason)
    end
    true
  end
  
  
  def diff document_id, patch
    for editor in @editors[document_id]
      if editor == @caller
        @caller.notify! :info, "patching remotely"
      else
        editor.notify! :patch, patch
      end
    end
    'diffed'
  end
  
  private

  def initialize
    @documents = {}
    @editors = {}
    @owners = {}
  end

  def log?; true end
end

sleep
