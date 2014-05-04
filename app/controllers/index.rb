get '/' do
  redirect '/tasks'
end

get '/tasks' do
  @tasks = Task.all
  @tasks.sort! { |a,b| a.id <=> b.id }
  erb :index
end

post '/tasks' do
  @task = Task.create(params)
  erb :_task_display, locals: {task: @task}, layout: false
end

put '/tasks/:id/complete' do
  @task = Task.find(params[:id])
  @task.update_attribute(:complete, true)
  content_type :json
  params[:id].to_json
end

put '/tasks/:id/edit' do
  @task = Task.find(params[:id])
  @task.update_attribute(:description, params[:description])
  data = { task_id: @task.id, description: params[:description] }
  content_type :json
  data.to_json
end

delete '/tasks/:id' do
  @task = Task.find(params[:id])
  @task.destroy
  content_type :json
  params[:id].to_json
end
