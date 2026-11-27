export async function readApiResponse<T>(response: Response): Promise<T> {
  const body = await response.text();
  if (!body.trim()) {
    throw new Error(`サーバーから空の応答が返りました（HTTP ${response.status}）。D1マイグレーションの適用状況とサーバーログを確認してください。`);
  }
  try {
    return JSON.parse(body) as T;
  } catch {
    throw new Error(`サーバーがJSON以外の応答を返しました（HTTP ${response.status}）。D1マイグレーションの適用状況とサーバーログを確認してください。`);
  }
}
