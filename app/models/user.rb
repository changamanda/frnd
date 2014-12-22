class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :user_shifts
  has_many :shifts, through: :user_shifts

  def grade
  	case self.year
  	when 1
  		"Freshman"
  	when 2
  		"Sophomore"
  	when 3
  		"Junior"
  	else
  		"Senior"
  	end
  end
end
