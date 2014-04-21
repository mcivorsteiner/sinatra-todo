get '/' do
  Task.set_display_ids
  @tasks = Task.all.map(&:to_s)
  erb :index
end

post '/' do
  Task.create!(description: params[:new_task_description])
  redirect '/'

end

get '/delete/:id' do

  # @task = Task.delete(params[:id])
  # erb :delete

end

post '/delete/:id' do
  Task.delete(params[:id])
  redirect '/'
end

post '/complete/:id' do
  Task.complete(params[:id])
  redirect '/'
end

# get '/list' do
#   Task.set_display_ids
#   @tasks = Task.all.map(&:to_s)
#   erb :list_tasks
# end


# get '/' do
#   # Look in app/views/index.erb
#   erb :index
# end

# get '/bands' do
#   @band_names = Band.all.map(&:name)
#   erb :bands
# end

# post '/bands' do
#   new_band = Band.create!(name: params[:name])
#   redirect "/bands/#{new_band.id}"
# end

# get '/bands/new' do
#   erb :new_band
# end

# get '/bands/:id' do
#   @band = Band.find(params[:id])
#   erb :show_band
# end

# get '/info' do
#   Demo.new(self).info
# end
