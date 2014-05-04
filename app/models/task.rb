class Task < ActiveRecord::Base

  def complete?
    complete
  end

end
