import { DataService } from './dataService'

export const uploadService = {
  image: ({ file, folder, onUploadProgress }) => {
    const params = new URLSearchParams({ folder })

    return DataService.postFile(
      `/uploads?${params.toString()}`,
      file,
      'image',
      onUploadProgress
    )
  },

  video: ({ file, folder, onUploadProgress }) => {
    const params = new URLSearchParams({ folder })

    return DataService.postFile(
      `/uploads/video?${params.toString()}`,
      file,
      'video',
      onUploadProgress
    )
  },
}
