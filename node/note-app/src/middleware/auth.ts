import { NextFunction, Request, Response } from 'express'
import User, { UserDocument } from '../models/user'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: UserDocument
  token?: string
}

type DecodedToken = {
  _id: string
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization')
    if (!authHeader) throw new Error()

    const token = authHeader.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) throw new Error()

    req.user = user
    req.token = token

    next()
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' })
  }
}

export default auth
