function fetchStreams() {
    fetch('fetch_streams.php')
        .then(response => response.json())
        .then(data => updateStreamList(data.baseUrl, data.streams))
        .catch(error => console.error('Error:', error));
}

function updateStreamList(baseUrl, streams) {
    const container = document.getElementById('streamContainer');

    if (streams.length === 0) {
        container.innerHTML = '<div class="no-streams">Aktuell laufen keine Streams.</div>';
        return;
    }

    container.innerHTML = '';

    streams.forEach(stream => {
        if (stream.NowPlayingItem && stream.PlayState) {
            const progressPercentage = calculateProgress(stream);
            const fileSize = stream.NowPlayingItem.Size || 'Unknown';
            const bitrate = stream.NowPlayingItem.MediaStreams.find(ms => ms.Type === "Video")?.BitRate || 'Unknown';
            const playMethod = stream.PlayState.PlayMethod || 'Unknown';

            const imageUrl = stream.NowPlayingItem.ImageTags && stream.NowPlayingItem.ImageTags.Primary
                ? baseUrl + '/emby/Items/' + stream.NowPlayingItem.Id + '/Images/Primary'
                : 'default_image.jpg';

            const currentTime = formatTime(stream.PlayState.PositionTicks);
            const totalTime = formatTime(stream.NowPlayingItem.RunTimeTicks);

            const streamElement = document.createElement('div');
            const streamName = stream.NowPlayingItem.SeriesName
                ? `${stream.NowPlayingItem.SeriesName} - ${stream.NowPlayingItem.Name}`
                : stream.NowPlayingItem.Name || 'N/A';
            streamElement.className = 'stream-item';
            streamElement.innerHTML = `
            <img src="${imageUrl}" alt="Movie image">
            <div class="stream-info">
                <div><span class="label">User:</span><span class="value">${stream.UserName || 'N/A'}</span></div>
                <div><span class="label">Device:</span><span class="value">${stream.DeviceName || 'N/A'}</span></div>
                <div><span class="label">Stream:</span><span class="value">${streamName}</span></div>
                <div><span class="label">Movie size:</span><span class="value">${formatFileSize(fileSize)}</span></div>
                <div><span class="label">Bitrate:</span><span class="value">${formatBitrate(bitrate)} kbps</span></div>
                <div><span class="label">Mode:</span><span class="value">${playMethod}</span></div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${progressPercentage}%;"></div>
                </div>
                <div class="time-info">Current time: ${currentTime} / Total time: ${totalTime}</div>
            </div>`;

            container.appendChild(streamElement);
        }
    });
}

function calculateProgress(stream) {
    if (!stream.NowPlayingItem || !stream.PlayState) {
        return 0;
    }

    const duration = stream.NowPlayingItem.RunTimeTicks ? stream.NowPlayingItem.RunTimeTicks / 10000 : 0;
    const position = stream.PlayState.PositionTicks ? stream.PlayState.PositionTicks / 10000 : 0;
    return duration > 0 ? (position / duration) * 100 : 0;
}

function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function formatBitrate(bitrate) {
    return bitrate ? `${(bitrate / 1000).toFixed(2)} Mbps` : 'Unknown';
}

function formatTime(ticks) {
    const totalSeconds = ticks / 10000000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

fetchStreams();
setInterval(fetchStreams, 5000);
