get '/' do
  redirect '/tasks'
end

get '/tasks' do
  # Task.set_display_ids
  @tasks = Task.all
  erb :index
end

post '/tasks' do
  @task = Task.create(params)
  erb :_task_display, locals: {task: @task}, layout: false
end

delete '/tasks/:id' do
  @task = Task.delete(params[:id]).
  redirect '/'
end

put '/tasks/:id/complete' do
  @task = Task.find(params[:id])
  @task.update_attribute(:complete, true)
  p @task
  content_type :json
  params[:id].to_json
end

get '/tasks/:id/edit' do
  @task = Task.find(params[:id])
  erb :edit
end

put '/tasks/:id' do
 Task.find(params[:id]).update_attribute(:description, params[:edit_task])
 redirect '/tasks'
end 
