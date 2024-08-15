export default function Footer() {
  return (
    <footer className="p-4 bg-white sm:p-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img src="#" className="h-8 mr-3" alt="로고 이미지" />
              <span className="self-center text-zp-lg whitespace-nowrap">
                ZiPPlZ
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-zp-gray">
                Resources
              </h2>
              <ul className="text-gray-600">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    ZiPPlZ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-zp-gray">
                Follow us
              </h2>
              <ul className="text-zp-gray">
                <li className="mb-4">
                  <a href="#" className="hover:underline ">
                    Github
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-zp-gray">
                Legal
              </h2>
              <ul className="text-zp-gray">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-zp-light-gray sm:text-center">
            © 2024
            <a href="#" className="hover:underline">
              ZiPPlZ
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="#" className="text-zp-light-gray hover:text-zp-gray">
              {/* 이미지 */}
            </a>
            <a href="#" className="text-zp-light-gray hover:text-zp-gray">
              {/* 이미지 */}
            </a>
            <a href="#" className="text-zp-light-gray hover:text-zp-gray">
              {/* 이미지 */}
            </a>
            <a href="#" className="text-zp-light-gray hover:text-zp-gray">
              {/* 이미지 */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
