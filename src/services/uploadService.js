import { DataService } from './dataService'

export const uploadService = {
  image: ({ file, folder, onUploadProgress }) => {
    return DataService.postFile(
      `/uploads?folder=${folder}`,
      file,
      'image',
      onUploadProgress
    )
  },
}