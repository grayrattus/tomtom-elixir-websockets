import {useEffect, useRef} from "react"

export const useBackendApi = (): { incommingMessageCallback: any, sendMessageCallback: any} => {
	const socket = useRef<WebSocket>();
	const incommingMessageCallback = useRef<any>();
	const sendMessageCallback = useRef<any>();

	const setupSocket = () => {
		socket.current = new WebSocket("ws://localhost:4000/ws/chat");

		socket.current.addEventListener('message', incommingMessageCallback.current);
		socket.current.addEventListener('close', () => {
			setupSocket();
		})
	}

	sendMessageCallback.current = (data: any) => {
		console.log('Wchodzi', data.toString());
		if (socket.current && socket.current.readyState === WebSocket.OPEN) {
			socket.current.send(JSON.stringify({
				data: {message: data.toString()}
			}));
		}
	}
	
	useEffect(() => {
		setupSocket();
	}, [])

	return {
		incommingMessageCallback,
		sendMessageCallback
	}
}
