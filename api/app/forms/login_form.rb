class LoginForm < BaseForm
  attr_accessor :email

  def save_transactioned
    user = User.find_by(email: email)

    if user
      @id = user.id

      true
    else
      user = User.new(email: email)

      simple_save(user, [user]) do
        import_error(user, { email: :email })
      end
    end
  end
end