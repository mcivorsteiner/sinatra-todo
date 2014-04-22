get '/' do
  redirect '/tasks'
end

get '/tasks' do
  Task.set_display_ids
  @tasks = Task.all
  erb :index
end

post '/tasks' do
  Task.create!(description: params[:new_task_description])
  redirect '/'
end

delete '/tasks/:id' do
  Task.delete(params[:id])
  redirect '/'
end

put '/tasks/:id/complete' do
  Task.complete(params[:id])
  redirect '/'
end

get '/tasks/:id/edit' do
  @task = Task.find_by_display_id(params[:id])
  erb :edit
end

put '/tasks/:id' do
 Task.find_by_display_id(params[:id]).update_attribute(:description, params[:edit_task])
 redirect '/tasks'
end 
