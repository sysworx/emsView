# emsView - Streaming Monitor for Emby Server

## Overview
`emsView` is an  simple web application designed to monitor active streaming sessions on an Emby Media Server in real-time. As a Progressive Web App (PWA), it offers a user-friendly interface to display all ongoing streams, including detailed information like user data, played content, quality, and more.

## Key Features
- **Real-Time Streaming Monitoring**: Keep track of all active streams on your Emby Server as they happen.
- **Detailed Stream Information**: View details such as username, device, currently played content, stream quality, bitrate, and progress.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Ease of Use**: Simple setup and intuitive interface for effortless operation.

## Technology Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP (for interfacing with the Emby Server API)

## Installation
1. Clone the repository to your web server.
2. Configure `fetch_streams.php` to connect with your Emby Server.

## Configuration
- Input your Emby Server's API details and host information in `fetch_streams.php`.
- Feel free to customize the design or features in the HTML, CSS, and JavaScript files.
  
## Usage
Launch the application in a web browser. The homepage displays a list of all active streams, updated every 5 seconds to reflect the latest streaming data.

## Contributing
We welcome contributions! If you have suggestions for improvements or additional features, please don't hesitate to submit pull requests or open issues.

## License
This project is licensed under the [MIT License](LICENSE).
