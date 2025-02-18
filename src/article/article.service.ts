import { Injectable } from "@nestjs/common";

@Injectable()
export class ArticleService {
    async createArticle() {
        return 'This action adds a new article';
    }
}