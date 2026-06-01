# Status Flow

## 

```mermaid
flowchart TD
A[开始] --> B{已登录?}  
B -- 是 --> C[进入首页]  
B -- 否 --> D[跳转登录页]
```