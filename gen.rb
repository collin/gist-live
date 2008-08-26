require 'rubygems'
require 'pathname'
require 'sinatra/lib/sinatra'

__DIR__ = Pathname.new(__FILE__).dirname.expand_path
APP_ROOT = __DIR__