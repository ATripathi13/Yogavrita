export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export class TimerManager {
  private intervalId: number | null = null;
  private remainingSeconds: number = 0;
  private state: TimerState = 'idle';
  private onTickCallback: ((remaining: number) => void) | null = null;
  private onCompleteCallback: (() => void) | null = null;

  /**
   * Start the timer with specified duration
   */
  start(
    durationSeconds: number,
    onTick: (remaining: number) => void,
    onComplete: () => void
  ): void {
    // Clear any existing timer
    this.stop();

    this.remainingSeconds = durationSeconds;
    this.onTickCallback = onTick;
    this.onCompleteCallback = onComplete;
    this.state = 'running';

    // Call onTick immediately with initial value
    onTick(this.remainingSeconds);

    // Start countdown
    this.intervalId = window.setInterval(() => {
      this.tick();
    }, 1000);
  }

  /**
   * Internal tick function
   */
  private tick(): void {
    if (this.state !== 'running') return;

    this.remainingSeconds--;

    if (this.onTickCallback) {
      this.onTickCallback(this.remainingSeconds);
    }

    if (this.remainingSeconds <= 0) {
      this.state = 'completed';
      this.stop();
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }
  }

  /**
   * Pause the timer
   */
  pause(): void {
    if (this.state !== 'running') return;

    this.state = 'paused';
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Resume the timer from paused state
   */
  resume(): void {
    if (this.state !== 'paused') return;

    this.state = 'running';
    this.intervalId = window.setInterval(() => {
      this.tick();
    }, 1000);
  }

  /**
   * Stop the timer completely
   */
  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.state = 'idle';
  }

  /**
   * Get remaining time in seconds
   */
  getRemainingTime(): number {
    return this.remainingSeconds;
  }

  /**
   * Get current timer state
   */
  getState(): TimerState {
    return this.state;
  }

  /**
   * Check if timer is running
   */
  isRunning(): boolean {
    return this.state === 'running';
  }

  /**
   * Check if timer is paused
   */
  isPaused(): boolean {
    return this.state === 'paused';
  }
}
