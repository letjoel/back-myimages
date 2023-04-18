export const renameImage = (req:Express.Request, file: Express.Multer.File, callback:any)=>{
    const name = file.originalname.split('.')[0];
    const fileExtension = file.mimetype.split('/')[1];
    const randomName = Array(4)
        .fill(null)
        .map(()=>Math.round(Math.random()*16).toString(16))
        .join('');

    callback(null, `${Date.now()}-${name}-${randomName}.${fileExtension}`);
}

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: any) => {
    if (!file) {
        return callback(new Error('No file'), false);
    }

    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg','jpeg','png','gif'];

    if (!validExtensions.includes(fileExtension)) {
        return callback(new Error('Invalid file format type'), false)
    }

    callback(null,true)
}