require 'rubygems'
require 'pathname'

__DIR__ = Pathname.new(__FILE__).dirname.expand_path
APP_ROOT = __DIR__ + '..'


require APP_ROOT + 'vendor/sinatra/lib/sinatra'
