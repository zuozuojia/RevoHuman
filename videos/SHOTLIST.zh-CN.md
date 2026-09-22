# RevoHuman 演示视频拍摄清单

页面（`index.html` 的 `§Video` 与 `§Demonstration videos` 两节）里已经接好 11 个视频位。**目前一个 mp4 都没有** —— 每个视频位都显示 "coming soon" 占位卡片，只要文件出现在下面指定的确切路径，播放器就会自动接替占位卡片。除此之外页面不需要任何改动。

## 导出规格 —— 11 条片子统一适用

| 约束 | 取值 | 原因 |
|---|---|---|
| 封装 / 编码 | MP4，H.264 High，`yuv420p`，`+faststart` | 页面只声明了一个 `<source type="video/mp4">`，没有 WebM 兜底；不是 H.264 的 MP4 会加载失败，视频位会静默保持在占位状态。 |
| 画幅 | **必须 16:9** | `.video-slot{aspect-ratio:16/9}` 配合 `object-fit:cover` —— 其它比例一律被居中裁切，画面边缘直接丢失。 |
| 分辨率 / 帧率 | 1920×1080，30 fps | 横向轨道的卡片实际渲染宽度只有 **300 px（高 169 px）**，总览视频约 712 px 宽；1080p 已经足够。 |
| 声音 | 无（`-an`） | 播放器是 `muted loop playsInline controls`，声音不会被听到。 |
| 时长 | 总览 10–20 s，轨道内每条 4–8 s | 片子会循环播放，短一点才便于一眼看清。 |
| 文件大小 | 每条 ≤ 8–10 MB | 仓库里现有配图就有 8.7 MB，Pages 直接由仓库提供服务。 |
| 文件名 | 必须完全一致，全小写，无空格 | `data-src` 里写的是字面路径。 |

真正的硬约束是**可辨识度**：轨道卡片在 1080p 屏幕上只有 300 px 宽，所以要贴近手部与接触区域拍摄，一条片子只拍一个动作，不要拍手在画面里只占一点点的全景。

## A. 总览 —— 1 条，占满正文栏宽

| 文件 | 页面位置 | 内容 | 时长 |
|---|---|---|---|
| `videos/overview.mp4` | `§Video`，紧接 Abstract 之后 | 无声串场：佩戴手套 → 完成一个灵巧操作任务 → 带出关节与触觉信号。这是唯一以大字面展示的片子，整套系统的故事由它承载。 | 10–20 s |

## B. 数据采集片段 —— 轨道 1，6 条（实拍）

| 文件 | 标题 | 机位 | 必须看清的内容 |
|---|---|---|---|
| `videos/task-pinch.mp4` | Fine pinch grasping（精细捏取） | 人类中心视角 | 拇指与食指捏取小物件；指尖接触在 300 px 宽度下仍然可辨。 |
| `videos/task-inhand.mp4` | In-hand manipulation（手内操作） | 人类中心视角 | 全程能看到物件在掌心内被重新调整姿态 —— 这正是人类中心视角应当覆盖的情形。 |
| `videos/task-tool.mp4` | Tool use（工具使用） | 手腕视角 | 抓握并使用工具；手腕视角必须拍到握持与接触，而不是环境。 |
| `videos/task-twist.mp4` | Twisting & insertion（旋转插入） | 手腕视角 | 轴向旋转 → 插入（轴孔装配、拧瓶盖之类）；旋转过程要在 4–8 s 内看得出来。 |
| `videos/task-deformable.mp4` | Deformable objects（可变形体） | 人类中心视角 | 布料 / 面团 / 软体物件在手部作用下的形变。 |
| `videos/task-bimanual.mp4` | Bimanual coordination（双手协同） | 人类中心视角 | 双手共同操作同一物件。 |

人类中心视角 = 操作者头戴相机；手腕视角 = 手套上的腕部相机。多数运动相机默认 4:3，能在机内切到 16:9 就切；把 4:3 裁成 16:9 会白白丢掉三分之一的传感器画面。

## C. 信号与回放 —— 轨道 2，4 条（流程渲染，非实拍）

| 文件 | 标题 | 标签 | 内容 |
|---|---|---|---|
| `videos/viz-kinematics.mp4` | Kinematic reconstruction（运动学重建） | 21 DoF | 屏幕录制：由 21 个编码器自由度驱动的骨架 / URDF。 |
| `videos/viz-tactile.mp4` | Tactile response（触觉响应） | full palm | 接触过程中的全掌触觉图叠加显示 —— 要能看出是全掌覆盖。 |
| `videos/viz-sync.mp4` | Timeline alignment（时间轴对齐） | < 1 ms | 对齐曲线本身。这条片子是 `< 1 ms` 这个标签的视觉依据，不要用示意图应付。 |
| `videos/viz-replay.mp4` | Simulation replay（仿真回放） | fidelity check | 参考动作与仿真回放的并排对比，支撑保真度结论。 |

这几条来自采集 / 可视化流程（屏幕录制或 Blender 渲染），不是相机素材。两个坑：渲染输出同样必须是 `yuv420p`（10 bit 或 4:4:4 在 Chrome 里会显示成黑帧）；H.264 要求宽高为偶数像素，奇数尺寸的画面补 1 px。

## 导出前检查

- [ ] 手套线缆与手背采集盒收拾到画面外；金属连杆不要反光。
- [ ] 起幅稳定 2 s，一条片子只拍一个连续动作，结尾稳定停留（片子会循环）。
- [ ] 6 条采集片段的灯光与白平衡保持一致 —— 它们在同一条轨道里并排展示。
- [ ] 不要竖屏素材，也不要依赖播放器去处理旋转元数据：先把旋转烘焙进画面，再用下面的 `ffprobe` 复核。
- [ ] 采集片段要与论文里的说法一致；与标题矛盾的画面，比缺一条片子代价更大。

## 编码 —— 可直接运行

`ffmpeg` 已安装在 `/opt/homebrew/bin/ffmpeg`。下面这条命令与页面自身的裁切行为一致（先放大到刚好覆盖，再居中裁成 16:9）：

```bash
mkdir -p videos && for f in raw/*.mov; do
  ffmpeg -i "$f" \
    -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 21 -preset slow \
    -movflags +faststart -an "videos/$(basename "${f%.*}").mp4"
done
```

## 提交前逐条核验

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=codec_name,width,height,pix_fmt,avg_frame_rate -show_entries format=duration,size \
  -of default=nw=1 videos/task-pinch.mp4
```

期望看到 `codec_name=h264`、`width=1920`、`height=1080`、`pix_fmt=yuv420p`。然后打开页面：对应的视频位会在 `loadedmetadata` 时用播放器替换掉占位卡片。如果仍然显示 "coming soon"，说明文件名写错、或者不是 H.264 —— 浏览器不会给出任何报错。
