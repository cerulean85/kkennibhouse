export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('복사 성공!');
        alert('클립보드에 복사되었습니다.: ' + text);
      })
      .catch((error) => {
        console.error('복사 실패:', error);
        alert('클립보드 복사에 실패했습니다.');
      });
  }