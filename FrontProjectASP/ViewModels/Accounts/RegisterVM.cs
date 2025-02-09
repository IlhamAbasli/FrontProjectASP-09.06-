﻿using System.ComponentModel.DataAnnotations;

namespace FrontProjectASP.ViewModels.Accounts
{
    public class RegisterVM
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = ("Email address is not valid"))]
        public string Email { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }
    }
}
