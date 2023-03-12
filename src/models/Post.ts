import { CommentModel, CommentWithCreatorDB, PostDB } from "../types"
import {CreateCommentsOutputDTO} from '../dtos/CommentDTO'
import { CreatePostOutputDTO } from "../dtos/PostDTO"

export class Post{
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private comments: number,
        private creatorNickname: string,
        private createdAt: string,
        private updatedAt: string 
    ){}

    public getId(): string{
        return this.id
    }

    public getContent(): string{
        return this.content
    }

    public setContent(value: string): void{
        this.content = value
    }

    public getLikes(): number{
        return this.likes
    }

    public setLikes(value: number): void{
        this.likes = value
    }
    
    public addLike(){
        this.likes += 1
    }

    public removeLike(){
        this.likes -= 1
    }

    public addDislike(){
        this.dislikes += 1
    }

    public removeDislike(){
        this.dislikes -= 1
    }

    public getDislikes(): number{
        return this.dislikes
    }

    public setDislikes(value: number): void{
        this.dislikes = value
    }

    public getCreatedAt(): string{
        return this.createdAt
    }

    public setCreatedAt(value: string){
        this.createdAt = value
    }

    public getUpdatedAt(): string{
        return this.updatedAt
    }

    public setUpdatedAt(value: string): void{
        this.updatedAt = value
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public getCreatorNickName(): string {
        return this.creatorNickname
    }

    public setCreatorNickName(value: string): void {
        this.creatorNickname = value
    }

    public getComments(): number{
        return this.comments
    }

    public setComments(value: number){
        this.comments = value
    }

    public toDBModel(): PostDB{
        return{
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments: this.comments,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): CreatePostOutputDTO{
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            creator: {
                id: this.creatorId,
                nickname: this.creatorNickname
            },
            comments:{
                count: this.comments,
                comments: []
            },
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    public insertComent(commentsExt: CommentModel[]): CreatePostOutputDTO{
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            creator: {
                id: this.creatorId,
                nickname: this.creatorNickname
            },
            comments:{
                count: this.comments,
                comments: commentsExt
            },
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}