import { Schema, model, Document, Model } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export interface UserDocument extends Document {
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

userSchema.methods.toJSON = function () {
  const userPublicData = this.toObject()

  delete userPublicData.password
  delete userPublicData.tokens

  return userPublicData
}

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET!)

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

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Unable to login!')

  return user
}

userSchema.pre('save', async function (next) {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 8)

  next()
})

const User = model<UserDocument, UserModel>('User', userSchema)

export default User
