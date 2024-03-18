import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSetRecoilState } from 'recoil';
import { alarmInfoState } from '@/atom/alarminfo';


export class WebSocketService {
  private client: Client;
  private connected: boolean = false; // 연결 여부

  constructor() {
    this.client = new Client({
      // 프로젝트의 end-point에 따라 url 설정
      webSocketFactory: () => new SockJS(import.meta.env.VITE_BASE_URL + '/websocket/appointment'),
      
      // 연결 성공시
      onConnect: () => {
        this.connected = true;
        this.subscribeToNotifications();
        console.log('STOMP 연결 성공');
      },
      
      // 연결 실패시
      onDisconnect: () => {
        this.connected = false;
      },
    });
	
   	// 연결 에러 핸들링
    this.client.onStompError = (err: any) => {
      console.error('STOMP 에러 : ', err);
    };
  }

  private subscribeToNotifications(): void {
    const uuid = localStorage.getItem('uuid');
    // const setAlarmInfo = useSetRecoilState(alarmInfoState)
    if(!uuid) return
    console.log('연결')
    this.client.subscribe(`/topic/appointment/${uuid}`, (message: any) => {
      
      // 알림, 채팅 데이터가 있을 경우 JSON 파싱
      if (message.body) {
        const body = JSON.parse(message.body);
        console.log(body)
        // setAlarmInfo(body)
        // zustand store에 새로운 데이터 추가

        // zustand store의 알림 여부 true
        
      }
      return;
    });
  }

  public setToken(token: string): void {
    this.client.configure({
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public connect(): void {
    if (!this.connected) {
      this.client.activate();
    }
  }

  public disconnect(): void {
    if (this.connected) {
      this.client.deactivate();
    }
  }
}