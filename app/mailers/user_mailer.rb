class UserMailer < ActionMailer::Base
	default to: 'frngrinnell@gmail.com',
					bcc: Proc.new { User.pluck(:email) },
          from: 'frngrinnell@gmail.com'

  def sub_email(user, shift_item_id)
    @user = user
    @shift  = ShiftItem.find(shift_item_id)
    mail(subject: 'Sub Request')
  end
end
