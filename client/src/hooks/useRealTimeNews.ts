import { useEffect, useState } from 'react';

export interface BreakingNewsEvent {
  id: string;
  title: string;
  category: string;
  slug: string;
  createdAt: string;
}

export interface CommentEvent {
  articleId: string;
  comment: any;
}

export const useRealTimeNews = () => {
  const [latestBreakingNews, setLatestBreakingNews] = useState<BreakingNewsEvent | null>(null);
  const [latestComment, setLatestComment] = useState<CommentEvent | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const eventSource = new EventSource('/api/v1/articles/realtime/stream');

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    eventSource.addEventListener('breaking_news', (event: MessageEvent) => {
      try {
        const data: BreakingNewsEvent = JSON.parse(event.data);
        setLatestBreakingNews(data);
      } catch (err) {
        console.error('Failed to parse breaking_news SSE event', err);
      }
    });

    eventSource.addEventListener('new_comment', (event: MessageEvent) => {
      try {
        const data: CommentEvent = JSON.parse(event.data);
        setLatestComment(data);
      } catch (err) {
        console.error('Failed to parse new_comment SSE event', err);
      }
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return {
    isConnected,
    latestBreakingNews,
    latestComment,
  };
};
