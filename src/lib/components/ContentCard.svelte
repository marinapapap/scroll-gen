<script lang="ts">
  import { paddingMap } from "./constants";

  export let title: string;
  export let text: string;
  export let bgColor: string = '#f9f9f9';
  export let textColor: string = '#222';
  export let padding: 'compact' | 'normal' | 'spacious' = 'normal';
  export let alignment: 'left' | 'center' | 'right' = 'left';
</script>

<div 
  class="content-card" 
  style="
    --bg: {bgColor}; 
    --color: {textColor};
    --padding: {paddingMap[padding]};
    --alignment: {alignment};
  "
>
  <h2>{title}</h2>

  <p>{text}</p>
</div>

<style>
  .content-card {
    background-color: var(--bg);
    color: var(--color);
    padding: var(--padding);
    text-align: var(--alignment);
    border-radius: 8px;
    margin: 20px 0;
  }
  
  h2 {
    margin-bottom: 16px;
  }
  
  p {
    line-height: 1.6;
  }
</style>
