import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikeEntity } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from 'src/posts/posts.service';
import { PostEntity } from 'src/posts/entities/post.entity';
import { AzureBlobService } from 'src/common/services/azure-blob.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, PostEntity, User])],
  controllers: [LikesController],
  providers: [LikesService, PostsService, AzureBlobService, UsersService],
})
export class LikesModule {}
