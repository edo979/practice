import { Schema, model, Document, Model } from 'mongoose'
import jwt from 'jsonwebtoken'

interface UserDocument extends Document {
  username: string
  age?: number
  email: string
  password: string
  tokens: { token: string }[]
  generateAuthToken: () => Promise<string>
}

interface UserModel extends Model<UserDocument> {
  findByCredentials: (email: string, password: string) => Promise<UserDocument>
}

const userSchema = new Schema<UserDocument, UserModel>({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'Username is too short!'],
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [3, 'Password is too short!'],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'jahjah')

  this.tokens = this.tokens.concat({ token })
  await this.save()

  return token
}

userSchema.statics.findByCredentials = async function (
  email: string,
  password: string
) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Unable to login!')

  if (user.password !== password) throw new Error('Unable to login!')

  return user
}

const User = model<UserDocument, UserModel>('User', userSchema)

export default User
