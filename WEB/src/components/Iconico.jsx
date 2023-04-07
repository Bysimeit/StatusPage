export default function Iconico(status) {
    if (status !== undefined) {
        let iconUrl;
        switch (status.status) {
            case 0:
            iconUrl = './greenIcon.ico';
            break;
            case 1:
            iconUrl = './blueIcon.ico';
            break;
            case 2:
            iconUrl = './orangeIcon.ico';
            break;
            case 3:
            iconUrl = './redIcon.ico';
            break;
            default:
            iconUrl = './blueIcon.ico';
        }
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = iconUrl;
        } else {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = iconUrl;
            document.head.appendChild(newLink);
        }
    }
}