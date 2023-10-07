import axios from "axios";

const main = async () => {
  const url =
    "https://graph.facebook.com/me?fields=email,birthday,link,first_name,id,last_name,gender,picture&access_token=EAADF4GqSjnsBO84epXgZAAB9rhDH54TpvFWum6PY72sfl9yt0A84Ybc1nQiZCuLKLoRcmHDU8S5PbqL1rRn9SZCkkc5yUI6Gf0jQWAzOAtdKtVZB0SiDiQ79VPkyGwelUkfRBt5Po7hfNJZCS7qVzLU5v9vFCAfBVjqZCtAcCMzMeCZCTDLBzfkgp4PBH3Jb4MYttA8nIyZAJXwttXEJ4Ov5ex0OiooZD";

  const data = await axios.get(url);
  console.log(data.data);
};

main();
