namespace A4291_Final_Project_NET_Frontend.Dto.Res
{
    public class ResLoginDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public UserData data { get; set; }

        public class UserData
        {
            public string id { get; set; }
            public string name { get; set; }
            public string email { get; set; }
            public string role { get; set; }
            public string jwtToken { get; set; }

        }
    }
}

