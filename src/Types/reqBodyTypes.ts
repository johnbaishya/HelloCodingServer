export type UpdateUserReqBody = {
    first_name:String,
    last_name:String,
}

export type AddGalleryReqBody = {
    entity_name:String,
    record_id:String,
}

export type CourseReqBody = {
    name:string,
    label:string,
    description:string,
}


export type LanguageReqBody = {
    name:string,
    label:string,
    description:string,
}


export type LevelReqBody = {
    name:string,
    label:string,
    description:string,
    index:number,
    course_id:string,
}


export type PlatformReqBody = {
    name:string,
    label:string,
    description:string,
}

export type UserProgressReqBody = {
    course_id:string,
    latest_completed_module:number,
    latest_module_id:string
}

export type ModuleReqBody = {
    name:string,
    label:string,
    description:string,
    index:number,
    type:string,
    course_id:string,
    level_id:string,
}



export type quizOptionsReqBody = {
    name:string,
    content:string
}


export type QuizModuleReqBody = {
    name:string,
    label:string,
    description:string,
    index:number,
    type:string,
    course_id:string,
    level_id:string,
    question:string,
    options:quizOptionsReqBody[],
    correct_answer:string,
}