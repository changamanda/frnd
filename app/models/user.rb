class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :user_shifts
  has_many :shifts, -> {uniq}, through: :user_shifts
  has_many :user_shift_items
  has_many :shift_items, through: :user_shift_items

  def signup(shift)
    self.shifts << shift
    self.shift_items << shift.shift_items
  end

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
