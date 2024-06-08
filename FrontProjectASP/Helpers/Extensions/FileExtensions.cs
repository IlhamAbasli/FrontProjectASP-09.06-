using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.FileSystemGlobbing.Internal;

namespace FrontProjectASP.Helpers.Extensions
{
    public static class FileExtensions
    {
        public static bool CheckFileSize(this IFormFile file, int size)
        {
            return file.Length / 1024 < size;
        }

        public static bool CheckFileType(this IFormFile file, string type)
        {
            return file.ContentType.Contains(type);
        }

        public static async Task SaveFileToLocalAsync(this IFormFile file,string path)
        {
            using FileStream stream = new(path, FileMode.Create);
                await file.CopyToAsync(stream);
        }

        public static void DeleteFileFromLocal(this string path)
        {
            if (File.Exists(path))
                File.Delete(path);
        }
    }
}
