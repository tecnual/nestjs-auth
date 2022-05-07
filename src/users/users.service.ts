import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscribeDTO } from '../models/requests/subscribe.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
/**
 * Users services
 */
export class UsersService {
  /**
   * Constructor
   * @param userModel
   */
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  /**
   * Add new user
   * @param subscribeDTO
   * @returns
   */
  async add(subscribeDTO: SubscribeDTO): Promise<UserDocument> {
    const addedUser = new this.userModel(subscribeDTO);
    return addedUser.save();
  }

  /**
   * Find all users with filter
   * @param filter
   * @returns
   */
  async findAll(filter: string): Promise<User[]> {
    return this.userModel.find({ $text: { $search: filter } }).exec();
  }

  /**
   * Find one user
   * @param username
   * @param password
   * @returns
   */
  async findOneById(id: string): Promise<UserDocument> {
    return this.userModel.findOne({_id: id}).exec();
  }

  /**
   * Find one user
   * @param username
   * @param password
   * @returns
   */
   async findOneByUserAndPassword(username: string, password: string): Promise<UserDocument> {
    return this.userModel.findOne({ username, password }).exec();
  }
}
