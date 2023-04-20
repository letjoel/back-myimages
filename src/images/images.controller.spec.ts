import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { getModelToken } from '@nestjs/mongoose';
import { Image } from './schemas/image.schema';
import { ImagesModule } from './images.module';

describe('ImagesController', () => {
  let controller: ImagesController;
  let imagesService: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ImagesModule]
    })
    .overrideProvider(getModelToken(Image.name))
    .useValue(jest.fn())
    .compile();

    controller = module.get<ImagesController>(ImagesController);
    imagesService = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return at least one result', async () => {

    jest.spyOn(imagesService, 'findAll').mockImplementation(()=>Promise.resolve([{_id: "643fb29333a532fbaf2db2bf", imageUrl:"http://localhost:3000/api/v1/images/1681896083693-cats-animals-domestic-cat-eyes-wallpaper-9105.jpeg",title: "Looking up", id: 330620590203624, __v:0 }] as unknown as Promise<Image[]>));

    const result = await controller.findAll();

    expect(result).toHaveLength(1)
    expect(result[0].title).toEqual("Looking up")
    expect(imagesService.findAll).toHaveBeenCalledTimes(1)
  });

});
