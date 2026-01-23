export const translations = {
    en: {
        nav: {
            home: 'Home',
            unity: 'Unity Developer',
            ai: 'AI Engineer',
            software: 'Software Engineer',
            status: 'SYSTEM_ONLINE'
        },
        sidebar: {
            role: 'Developer',
            origin: 'Origin',
            location: 'Current Location',
            birth: 'Birth_Date',
            contact: 'Contact',
            edu: 'Education',
            edu_items: [
                {
                    school: 'FPT University',
                    degree: 'Bachelor of Software Engineering',
                    time: '2022 - 2026',
                    gpa: 'GPA: 3.3/4.0'
                }
            ]
        },
        home: {
            intro: {
                init: '>_ INITIALIZING_INTRODUCTION_SEQUENCE...',
                hello: 'HELLO',
                world: 'WORLD.',
                desc: 'I am a Software Engineer with a passion for Machine Learning, Deep Learning, and Game Development. I thrive on learning continuously and creating innovative solutions.',
                badge1: 'Download_CV',
                badge2: 'View_Projects'
            },
            hobbies: {
                h1_label: 'Certificates',
                h1_title: 'Coursera Certificates',
                h1_desc: 'Continuous Professional Development & Specialized Specializations.',
                h2_label: 'Communication',
                h2_title: 'Languages',
                h2_desc: 'English: Intermediate\nVietnamese: Proficient',
                h3_label: 'Achievements',
                h3_title: '3 Papers Accepted by International Conferences',
                h3_items: [
                    {
                        text: 'Enhance an Efficient Contactless Palm Print Recognition System Tailored for University Environment (SSPS 2025 Accepted)',
                        link: 'https://ssps.net/2025.html'
                    },
                    {
                        text: 'Real-time Contactless Palm Print Identification System for Uncontrolled and Uncooperative Environment (FETC 2025 Accepted)',
                        link: 'https://science.fpt.edu.vn/FETC/AcceptedPaper/PaperDetail?id=085894e5-a2ac-4588-2ea8-08ddf05619f7'
                    },
                    {
                        text: 'Unlocking the Potential of Spike-based Transformer Architecture: Investigating Spiking Neural Models for Classification Task (FETC 2025 Accepted)',
                        link: 'https://science.fpt.edu.vn/FETC/AcceptedPaper/PaperDetail?id=00437dce-53d0-4093-2ea5-08ddf05619f7'
                    }
                ],
                view_cert: 'View Certificate'
            },
            tech: 'Tech_Stack',
            exp: 'Experience_Log',
            exp_items: [
                {
                    role: 'AI Researcher',
                    company: 'AIC Laboratory',
                    desc: 'Research on Deep Learning, Machine Learning, Anomaly Detection, and Computer Vision.',
                    time: 'May 2025 - Jan 2026'
                },
                {
                    role: 'Salesforce Developer Intern',
                    company: 'FPT Software',
                    desc: 'Developed Apex backend code, optimized database queries for the Japanese Airplane project, and implemented flows/lightning pages to streamline UX.',
                    time: 'Jan 2025 - May 2025'
                }
            ],

        },
        unity: {
            header: 'DEVELOPMENT_LOG',
            subheader: 'v.3.1.0 // PROJECT_HISTORY',
            view: 'View_Project',
            role_label: 'Role',
            timeline_label: 'Timeline',
            filters: ['ALL', 'GAMES', 'COMMUNITY PROJECTS'],
            next: 'Initializing_Next_Project...',
            games_title: 'GAMES',
            community_title: 'COMMUNITY PROJECTS',
            projects: [
                {
                    id: 'tempusia',
                    title: 'Tempusia',
                    desc: 'Based on rewinding time mechanics, Tempusia is a puzzle platformer requiring a clear mind. A Steam game project featuring complex character control and time manipulation.',
                    role: 'Character Control, Shaders, VFX, Animation, Logic Coding, Level Design'
                },
                {
                    id: 'story-game',
                    title: 'Story Game "PhongBat"',
                    desc: 'A story game built in URP Unity, where player choices affect the ending. Inspired by "Pho Anh Hai". A personal project made in two weeks.',
                    role: 'Personal Project'
                },
                {
                    id: 'battleground',
                    title: 'Simple Battleground',
                    desc: 'A simple Unity multiplayer LAN game where blocky combatants drop into an arena and fight until only one remains standing. Features a shrinking play area and skill drops. Made in 1 week.',
                    role: 'Personal Project'
                },
                {
                    id: 'procedural',
                    title: 'Unity Procedural Animation',
                    desc: 'Community project implementing procedural animation with rigging, player state machine for animation foot placement.',
                    role: 'Personal Project'
                },
                {
                    id: 'shader-code',
                    title: 'Unity URP Shaders Code',
                    desc: 'A collection of shader code for Unity URP including Stylized Grass, Toon Shader, Outline Shader, Water Shader, and Tesselation Shader.',
                    role: 'Personal Project'
                }
            ]
        },
        ai: {
            header: 'AI ENGINEER',
            subheader: 'v.2.0 // RESEARCH_PROFILE',
            badges: ['COMPUTER_VISION', 'GENERATIVE_AI', 'SPIKING_SYSTEMS'],
            tagline: 'Deep Learning Researcher',
            title: 'Research Profile',
            summary: 'I am a Software Engineer with a passion for Machine Learning, Deep Learning, and Game Development. I love building generative AI models like Diffusion, Flow Matching, and recently MeanFlow.',
            motto: 'CREATIVE IS THE BEST.',
            focus_title: 'Research Focus',
            focus: [
                {
                    label: 'Generative Systems',
                    items: ['Diffusion', 'Flow Matching', 'MeanFlow']
                },
                {
                    label: 'Vision & Biometrics',
                    items: ['Image Classification', 'Anomaly Detection', 'Palmprint Identification']
                },
                {
                    label: 'Neural Architectures',
                    items: ['Transformer', 'Mamba', 'Spiking Neural Networks']
                }
            ],
            tech_title: 'Tech_Stack',
            tech_items: ['PyTorch', 'PyTorch Lightning', 'FastAPI', 'Docker', 'Git', 'CI/CD', 'SSH', 'Linux', 'CUDA', 'ONNX', 'OpenCV', 'Albumentations', 'Hugging Face', 'TensorFlow', 'PostgreSQL', 'MLflow', 'Qdrant', 'n8n', 'ComfyUI', 'Apache Spark', 'Kafka'],
            tech_groups: [
                {
                    label: 'ML Frameworks',
                    items: ['PyTorch', 'PyTorch Lightning', 'TensorFlow', 'Hugging Face', 'OpenCV', 'Albumentations', 'CUDA', 'ONNX']
                },
                {
                    label: 'MLOps & Infra',
                    items: ['Docker', 'Git', 'CI/CD', 'Linux', 'SSH', 'MLflow', 'PostgreSQL']
                },
                {
                    label: 'Agents & Workflow',
                    items: ['FastAPI', 'n8n', 'ComfyUI', 'Qdrant']
                },
                {
                    label: 'Data Streaming',
                    items: ['Apache Spark', 'Kafka']
                }
            ],
            work_title: 'Work Experience',
            work: {
                period: 'May 2024 - Jan 2026',
                org: 'AIC Laboratory',
                role: 'Deep Learning Researcher',
                summary: 'Conducted research in computer vision, focusing on image classification, anomaly detection, spiking neural networks, and biometric identification pipelines.'
            },
            papers_title: 'Research Papers',
            papers_subtitle: 'v.1.0 // PUBLICATIONS',
            details_contrib_title: 'Abstract',
            view_more: 'View More',
            view_less: 'View Less',
            papers: [
                {
                    id: 'SSPS 2025',
                    period: 'Mar 2025 - Jun 2025',
                    venue: '7th International Symposium on Signal Processing Systems',
                    title: 'Enhance an Efficient Contactless Palm Print Recognition System Tailored for University Environment.',
                    badges: ['Accepted', 'First Author'],
                    contributions: [
                        'In university settings, traditional biometric systems requiring physical contact raise hygiene and scalability concerns. Ensuring high accuracy at low cost is challenging due to real-world factors like changing backgrounds, lighting, and movement. To address this, we propose an AI-driven, contactless palm print recognition system that integrates seamlessly with campus infrastructure for secure access. Inspired by deep learning-based depth estimation, we introduce a novel pipeline to remove noisy backgrounds, enhancing accuracy and robustness. A diverse dataset of university staff and students was collected to validate the system, achieving 94.59% identity accuracy, demonstrating its effectiveness in real-world conditions. These results validate the practicality and reliability of our proposed system for identity verification in community settings.'
                    ],
                    code_url: 'https://github.com/VKev/Palm-Print-Identification-System'
                },
                {
                    id: 'FETC 2025',
                    period: 'Jul 2025 - Oct 2025',
                    venue: '1st FPT International Conference on Emerging Trends in Computing',
                    title: 'Real-Time Contactless Palm Print Identification System for Uncontrolled and Uncooperative Environments.',
                    badges: ['Accepted', 'First Author'],
                    contributions: [
                        'Biometric identification systems, such as face, fingerprint, and palm print recognition, have become increasingly popular, with contactless modalities like face recognition gaining prominence due to the sensitivity of finger surfaces. However, face recognition is often hindered by high costs and performance degradation from factors like aging or physical exertion. Palm print recognition, on the other hand, offers greater stability over time and distinctiveness across individuals, making it a promising alternative. A key challenge in palm print recognition is achieving reliable performance in uncontrolled environments with dynamic backgrounds, varying lighting, and crowd interference, which complicate region of interest (ROI) extraction. In this paper, we propose a novel, real-time, contactless palm print identification system that is efficient, low-cost, and robust under such conditions. Our system achieves an AUC of 0.9286 and identity accuracy of 95.53% on the Birjand University Mobile Palmprint Database (BMPD), and an AUC of 0.9981 with 99.93% identity accuracy on a small, realistic dataset we collected.'
                    ],
                    code_url: 'https://github.com/VKev/Real-Time-Contactless-Palm-Print-Identification-System'
                },
                {
                    id: 'FETC 2025',
                    period: 'Jul 2025 - Oct 2025',
                    venue: '1st FPT International Conference on Emerging Trends in Computing',
                    title: 'Unlocking the Potential of Spike-based Transformer Architecture: Investigating Spiking Neural Models for Classification Task.',
                    badges: ['Accepted', 'Co-Author'],
                    contributions: [
                        'Spiking Neural Networks (SNNs) offer energy-efficient and biologically plausible alternatives to conventional Artificial Neural Networks (ANNs). The Spike-driven Transformer architecture integrates SNN efficiency with Transformer-based feature extraction, achieving competitive results for image classification. However, its reliance on the Leaky Integrate-and-Fire (LIF) neuron introduces computational overhead due to the leak mechanism. This work investigates alternative neuron models - IF Hard Reset and IF Soft Reset - which remove the leak dynamics to improve efficiency. We conduct systematic evaluations on CIFAR-10 and CIFAR-100 datasets, analyzing accuracy, inference speed, spike activity patterns and energy consumption across different neuron models. Experimental results show that IF Soft Reset achieves the highest accuracy at 94.53%, 76.56% compared to 94.44%, 76.15% of Hard Reset and 94.34%, 76.00% of LIF on CIFAR-10, CIFAR-100 respectively. It also achieves the fastest inference speed at 1323.4 FPS and 12.09 ms latency, outperforming IF Hard Reset with 1244.2 FPS and LIF with 1161.2 FPS. The improvement is attributed to its gradual reset behavior, which preserves residual excitation and enhances temporal processing. These findings offer practical design guidelines for deploying efficient spike-based Transformers under resource-constrained environments.'
                    ],
                    code_url: 'https://github.com/mintii13/Investigating-Spiking-Neural-Models'
                }
            ],
            code_label: 'Source Code'
        }
    },
    vi: {
        nav: {
            home: 'Trang Chủ',
            unity: 'Lập Trình Unity',
            ai: 'Kỹ Sư AI',
            software: 'Kỹ Sư Phần Mềm',
            status: 'HỆ_THỐNG_SẴN_SÀNG'
        },
        sidebar: {
            role: 'Lập Trình Viên',
            origin: 'Quê Quán',
            location: 'Hiện Tại',
            birth: 'Ngày_Sinh',
            contact: 'Liên Hệ',
            edu: 'Học Vấn',
            edu_items: [
                {
                    school: 'Đại Học FPT',
                    degree: 'Kỹ Sư Phần Mềm',
                    time: '2022 - 2026',
                    gpa: 'GPA: 3.3/4.0'
                }
            ]
        },
        home: {
            intro: {
                init: '>_ KHỞI_TẠO_GIỚI_THIỆU...',
                hello: 'CHÀO',
                world: 'THẾ GIỚI.',
                desc: 'Tôi là Kỹ Sư Phần Mềm với niềm đam mê Học Máy, Deep Learning và Phát Triển Game. Tôi thích học hỏi và tạo ra những điều mới mẻ.',
                badge1: 'Tải_CV',
                badge2: 'Xem_Dự_Án'
            },
            hobbies: {
                h1_label: 'Chứng Chỉ',
                h1_title: 'Coursera Certificates',
                h1_desc: 'Continuous Professional Development & Specialized Specializations.',
                h2_label: 'Giao Tiếp',
                h2_title: 'Ngôn Ngữ',
                h2_desc: 'Tiếng Anh: Trung Cấp\nTiếng Việt: Thành Thạo',
                h3_label: 'Thành Tựu',
                h3_title: '3 Bài Báo Được Chấp Nhận Bởi Hội Nghị Quốc Tế',
                h3_items: [
                    {
                        text: 'Enhance an Efficient Contactless Palm Print Recognition System Tailored for University Environment (SSPS 2025 Accepted)',
                        link: 'https://ssps.net/2025.html'
                    },
                    {
                        text: 'Real-time Contactless Palm Print Identification System for Uncontrolled and Uncooperative Environment (FETC 2025 Accepted)',
                        link: 'https://science.fpt.edu.vn/FETC/AcceptedPaper/PaperDetail?id=085894e5-a2ac-4588-2ea8-08ddf05619f7'
                    },
                    {
                        text: 'Unlocking the Potential of Spike-based Transformer Architecture: Investigating Spiking Neural Models for Classification Task (FETC 2025 Accepted)',
                        link: 'https://science.fpt.edu.vn/FETC/AcceptedPaper/PaperDetail?id=00437dce-53d0-4093-2ea5-08ddf05619f7'
                    }
                ],
                view_cert: 'Xem Chứng Chỉ'
            },
            tech: 'Công_Nghệ',
            exp: 'Kinh_Nghiệm',
            exp_items: [
                {
                    role: 'Nghiên Cứu Viên AI',
                    company: 'AIC Laboratory',
                    desc: 'Nghiên cứu về Deep Learning, Học Máy, Phát hiện Bất thường và Thị giác Máy tính.',
                    time: '05/2025 - 01/2026'
                },
                {
                    role: 'Thực tập sinh Lập trình Salesforce',
                    company: 'FPT Software',
                    desc: 'Phát triển backend Apex, tối ưu hóa truy vấn cơ sở dữ liệu cho dự án Máy bay Nhật Bản, và triển khai flows/trang lightning để cải thiện trải nghiệm người dùng.',
                    time: '01/2025 - 05/2025'
                }
            ]
        },
        unity: {
            header: 'NHẬT_KÝ_PHÁT_TRIỂN',
            subheader: 'v.3.1.0 // LỊCH_SỬ_DỰ_ÁN',
            view: 'Xem_Dự_Án',
            role_label: 'Vai Trò',
            timeline_label: 'Thời Gian',
            filters: ['TẤT CẢ', 'GAMES', 'DỰ ÁN CỘNG ĐỒNG'],
            next: 'Đang_Khởi_Tạo_Dự_Án_Mới...',
            games_title: 'GAMES',
            community_title: 'DỰ ÁN CỘNG ĐỒNG',
            projects: [
                {
                    id: 'tempusia',
                    title: 'Tempusia',
                    desc: 'Dựa trên cơ chế đảo ngược thời gian, Tempusia là một game đi cảnh giải đố đòi hỏi một cái đầu lạnh. Dự án game Steam với điều khiển nhân vật phức tạp và thao tác thời gian.',
                    role: 'Điều khiển nhân vật, Shaders, VFX, Hoạt ảnh, Logic, Thiết kế màn chơi'
                },
                {
                    id: 'story-game',
                    title: 'Game Cốt Truyện Phong Bắc',
                    desc: 'Một tựa game cốt truyện sử dụng URP Unity, nơi lựa chọn của người chơi ảnh hưởng đến kết thúc. Lấy cảm hứng từ "Phố Anh Hải". Dự án cá nhân hoàn thành trong hai tuần.',
                    role: 'Dự Án Cá Nhân'
                },
                {
                    id: 'battleground',
                    title: 'Chiến Trường Đơn Giản',
                    desc: 'Game LAN multiplayer đơn giản trên Unity, nơi các chiến binh khối hộp nhảy dù xuống đấu trường sinh tử. Tính năng vòng bo thu nhỏ và kỹ năng rơi từ bầu trời. Hoàn thành trong 1 tuần.',
                    role: 'Dự Án Cá Nhân'
                },
                {
                    id: 'procedural',
                    title: 'Unity Procedural Animation',
                    desc: 'Dự án cộng đồng triển khai hoạt ảnh thủ tục với rigging, máy trạng thái người chơi cho vị trí đặt chân hoạt ảnh.',
                    role: 'Dự Án Cá Nhân'
                },
                {
                    id: 'shader-code',
                    title: 'Unity URP Shaders Code',
                    desc: 'Bộ sưu tập shader code cho Unity URP bao gồm Stylized Grass, Toon Shader, Outline Shader, Water Shader và Tesselation Shader.',
                    role: 'Dự Án Cá Nhân'
                }
            ]
        },
        ai: {
            header: 'Kỹ Sư AI',
            subheader: 'v.2.0 // HỆ SỐ NGHIÊN CỨU',
            badges: ['COMPUTER_VISION', 'GENERATIVE_AI', 'SPIKING_SYSTEMS'],
            tagline: 'Nghiên cứu Deep Learning',
            title: 'Hệ số Nghiên cứu',
            summary: 'Tôi là Kỹ Sư phần mềm, đam mê Machine Learning, Deep Learning và phát triển game. Tôi thích xây dựng mô hình AI tạo sinh như Diffusion, Flow Matching, và gần đây là MeanFlow.',
            motto: 'SÁNG TẠO LÀ TUYỆT NHẤT.',
            focus_title: 'Hướng_nghiên_cứu',
            focus: [
                {
                    label: 'Hệ thống tạo sinh',
                    items: ['Diffusion', 'Flow Matching', 'MeanFlow']
                },
                {
                    label: 'Thị giác & sinh trắc',
                    items: ['Image Classification', 'Anomaly Detection', 'Palmprint Identification']
                },
                {
                    label: 'Kiến trúc thần kinh',
                    items: ['Transformer', 'Mamba', 'Spiking Neural Networks']
                }
            ],
            tech_title: 'Công nghệ',
            tech_items: ['PyTorch', 'PyTorch Lightning', 'FastAPI', 'Docker', 'Git', 'CI/CD', 'SSH', 'Linux', 'CUDA', 'ONNX', 'OpenCV', 'Albumentations', 'Hugging Face', 'TensorFlow', 'PostgreSQL', 'MLflow', 'Qdrant', 'n8n', 'ComfyUI', 'Apache Spark', 'Kafka'],
            tech_groups: [
                {
                    label: 'ML Frameworks',
                    items: ['PyTorch', 'PyTorch Lightning', 'TensorFlow', 'Hugging Face', 'OpenCV', 'Albumentations', 'CUDA', 'ONNX']
                },
                {
                    label: 'MLOps & Infra',
                    items: ['Docker', 'Git', 'CI/CD', 'Linux', 'SSH', 'MLflow', 'PostgreSQL']
                },
                {
                    label: 'Agents & Workflow',
                    items: ['FastAPI', 'n8n', 'ComfyUI', 'Qdrant']
                },
                {
                    label: 'Data Streaming',
                    items: ['Apache Spark', 'Kafka']
                }
            ],
            work_title: 'Kinh nghiệm',
            work: {
                period: 'May 2024 - Jan 2026',
                org: 'AIC Laboratory',
                role: 'Deep Learning Researcher',
                summary: 'Conducted research in computer vision, focusing on image classification, anomaly detection, spiking neural networks, and biometric identification pipelines.'
            },
            papers_title: 'Bài_báo',
            papers_subtitle: 'v.1.0 // CÔNG_BỐ',
            details_contrib_title: 'Tóm_tắt',
            view_more: 'Xem_thêm',
            view_less: 'Thu_gọn',
            papers: [
                {
                    id: 'SSPS 2025',
                    period: 'Mar 2025 - Jun 2025',
                    venue: '7th International Symposium on Signal Processing Systems',
                    title: 'Enhance an Efficient Contactless Palm Print Recognition System Tailored for University Environment.',
                    badges: ['Accepted', 'First Author'],
                    contributions: [
                        'In university settings, traditional biometric systems requiring physical contact raise hygiene and scalability concerns. Ensuring high accuracy at low cost is challenging due to real-world factors like changing backgrounds, lighting, and movement. To address this, we propose an AI-driven, contactless palm print recognition system that integrates seamlessly with campus infrastructure for secure access. Inspired by deep learning-based depth estimation, we introduce a novel pipeline to remove noisy backgrounds, enhancing accuracy and robustness. A diverse dataset of university staff and students was collected to validate the system, achieving 94.59% identity accuracy, demonstrating its effectiveness in real-world conditions. These results validate the practicality and reliability of our proposed system for identity verification in community settings.'
                    ],
                    code_url: 'https://github.com/VKev/Palm-Print-Identification-System'
                },
                {
                    id: 'FETC 2025',
                    period: 'Jul 2025 - Oct 2025',
                    venue: '1st FPT International Conference on Emerging Trends in Computing',
                    title: 'Real-Time Contactless Palm Print Identification System for Uncontrolled and Uncooperative Environments.',
                    badges: ['Accepted', 'First Author'],
                    contributions: [
                        'Biometric identification systems, such as face, fingerprint, and palm print recognition, have become increasingly popular, with contactless modalities like face recognition gaining prominence due to the sensitivity of finger surfaces. However, face recognition is often hindered by high costs and performance degradation from factors like aging or physical exertion. Palm print recognition, on the other hand, offers greater stability over time and distinctiveness across individuals, making it a promising alternative. A key challenge in palm print recognition is achieving reliable performance in uncontrolled environments with dynamic backgrounds, varying lighting, and crowd interference, which complicate region of interest (ROI) extraction. In this paper, we propose a novel, real-time, contactless palm print identification system that is efficient, low-cost, and robust under such conditions. Our system achieves an AUC of 0.9286 and identity accuracy of 95.53% on the Birjand University Mobile Palmprint Database (BMPD), and an AUC of 0.9981 with 99.93% identity accuracy on a small, realistic dataset we collected.'
                    ],
                    code_url: 'https://github.com/VKev/Real-Time-Contactless-Palm-Print-Identification-System'
                },
                {
                    id: 'FETC 2025',
                    period: 'Jul 2025 - Oct 2025',
                    venue: '1st FPT International Conference on Emerging Trends in Computing',
                    title: 'Unlocking the Potential of Spike-based Transformer Architecture: Investigating Spiking Neural Models for Classification Task.',
                    badges: ['Accepted', 'Co-Author'],
                    contributions: [
                        'Spiking Neural Networks (SNNs) offer energy-efficient and biologically plausible alternatives to conventional Artificial Neural Networks (ANNs). The Spike-driven Transformer architecture integrates SNN efficiency with Transformer-based feature extraction, achieving competitive results for image classification. However, its reliance on the Leaky Integrate-and-Fire (LIF) neuron introduces computational overhead due to the leak mechanism. This work investigates alternative neuron models - IF Hard Reset and IF Soft Reset - which remove the leak dynamics to improve efficiency. We conduct systematic evaluations on CIFAR-10 and CIFAR-100 datasets, analyzing accuracy, inference speed, spike activity patterns and energy consumption across different neuron models. Experimental results show that IF Soft Reset achieves the highest accuracy at 94.53%, 76.56% compared to 94.44%, 76.15% of Hard Reset and 94.34%, 76.00% of LIF on CIFAR-10, CIFAR-100 respectively. It also achieves the fastest inference speed at 1323.4 FPS and 12.09 ms latency, outperforming IF Hard Reset with 1244.2 FPS and LIF with 1161.2 FPS. The improvement is attributed to its gradual reset behavior, which preserves residual excitation and enhances temporal processing. These findings offer practical design guidelines for deploying efficient spike-based Transformers under resource-constrained environments.'
                    ],
                    code_url: 'https://github.com/mintii13/Investigating-Spiking-Neural-Models'
                }
            ],
            code_label: 'Source Code'
        }

    }
};

export type Language = 'en' | 'vi';
