#Guardfile for playground page

guard 'sass', :input => 'public/sass', :output => 'public/css'

guard 'livereload' do
  watch(%r{^playground\.rb})
  watch(%r{views/.+\.(erb)$})
  watch(%r{public/.+\.(scss|javascripts|js)})
end

guard 'shotgun' do
  watch('playground')
end
