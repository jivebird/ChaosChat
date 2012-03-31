require 'rubygems'
require 'mongoid'
require File.join(File.dirname(__FILE__), 'chaoschat.rb')

Mongoid.load!(File.join(File.dirname(__FILE__), 'config', 'mongoid.yaml'))
run ChaosChat
