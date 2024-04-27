export type NewsResponseType = {
status:string,
totalResults:number,
articles:Array<Article>
}

type Article = {
source:object
author:string|null,
title:string|null,
description:string|null,
url:string|null,
urlToImage:string|null,
publishedAt:string,
content:string|null
}

