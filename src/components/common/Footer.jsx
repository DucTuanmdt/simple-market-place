import React from "react";
import { Stack } from "rsuite";

const Footer = () => {
  return (
    <Stack className="bg-light mt-5 pt-3" justifyContent="center">
      <div className="container">
        <p>
          © 2023, Made with ❤️ by{" "}
          <a
            href="https://github.com/DucTuanmdt/simple-market-place"
            target="_blank"
            rel="noreferrer"
          >
            Duc Tuan
          </a>
        </p>
      </div>
    </Stack>
  );
};

export default Footer;
