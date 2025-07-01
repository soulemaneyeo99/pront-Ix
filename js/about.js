

class NeuralNetwork {
            constructor() {
                this.neurons = [];
                this.connections = [];
                this.container = document.getElementById('neuralBackground');
                this.init();
            }

            init() {
                this.createNeurons();
                this.createConnections();
                this.animate();
            }

            createNeurons() {
                const colors = ['blue', 'green', 'white', 'orange'];
                const neuronCount = 150;

                for (let i = 0; i < neuronCount; i++) {
                    const neuron = document.createElement('div');
                    neuron.className = `neuron ${colors[Math.floor(Math.random() * colors.length)]}`;
                    
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    
                    neuron.style.left = x + 'px';
                    neuron.style.top = y + 'px';
                    
                    neuron.dataset.x = x;
                    neuron.dataset.y = y;
                    neuron.dataset.vx = (Math.random() - 0.5) * 0.5;
                    neuron.dataset.vy = (Math.random() - 0.5) * 0.5;
                    
                    this.container.appendChild(neuron);
                    this.neurons.push(neuron);
                }
            }

            createConnections() {
                for (let i = 0; i < this.neurons.length; i++) {
                    for (let j = i + 1; j < this.neurons.length; j++) {
                        const neuron1 = this.neurons[i];
                        const neuron2 = this.neurons[j];
                        
                        const distance = this.getDistance(neuron1, neuron2);
                        
                        if (distance < 150 && Math.random() < 0.1) {
                            this.createConnection(neuron1, neuron2);
                        }
                    }
                }
            }

            createConnection(neuron1, neuron2) {
                const connection = document.createElement('div');
                connection.className = 'connection';
                
                const x1 = parseFloat(neuron1.dataset.x);
                const y1 = parseFloat(neuron1.dataset.y);
                const x2 = parseFloat(neuron2.dataset.x);
                const y2 = parseFloat(neuron2.dataset.y);
                
                const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                
                connection.style.left = x1 + 'px';
                connection.style.top = y1 + 'px';
                connection.style.width = distance + 'px';
                connection.style.transform = `rotate(${angle}deg)`;
                
                this.container.appendChild(connection);
                this.connections.push(connection);
            }

            getDistance(neuron1, neuron2) {
                const x1 = parseFloat(neuron1.dataset.x);
                const y1 = parseFloat(neuron1.dataset.y);
                const x2 = parseFloat(neuron2.dataset.x);
                const y2 = parseFloat(neuron2.dataset.y);
                
                return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            }

            updateNeuron(neuron) {
                let x = parseFloat(neuron.dataset.x);
                let y = parseFloat(neuron.dataset.y);
                let vx = parseFloat(neuron.dataset.vx);
                let vy = parseFloat(neuron.dataset.vy);
                
                x += vx;
                y += vy;
                
                if (x <= 0 || x >= window.innerWidth) vx *= -1;
                if (y <= 0 || y >= window.innerHeight) vy *= -1;
                
                x = Math.max(0, Math.min(window.innerWidth, x));
                y = Math.max(0, Math.min(window.innerHeight, y));
                
                neuron.style.left = x + 'px';
                neuron.style.top = y + 'px';
                neuron.dataset.x = x;
                neuron.dataset.y = y;
                neuron.dataset.vx = vx;
                neuron.dataset.vy = vy;
            }

            animate() {
                this.neurons.forEach(neuron => this.updateNeuron(neuron));
                
                // Update connections occasionally
                if (Math.random() < 0.01) {
                    this.connections.forEach(connection => connection.remove());
                    this.connections = [];
                    this.createConnections();
                }
                
                requestAnimationFrame(() => this.animate());
            }
        }

        // Initialize neural network
        document.addEventListener('DOMContentLoaded', () => {
            new NeuralNetwork();
            
            // Audio player functionality
            const playBtn = document.getElementById('playBtn');
            const audioDuration = document.getElementById('audioDuration');
            let isPlaying = false;
            let currentTime = 0;
            const totalTime = 65; // 1:05 in seconds
            
            playBtn.addEventListener('click', () => {
                if (!isPlaying) {
                    playBtn.textContent = '⏸';
                    isPlaying = true;
                    startTimer();
                } else {
                    playBtn.textContent = '▶';
                    isPlaying = false;
                }
            });
            
            function startTimer() {
                if (!isPlaying) return;
                
                const interval = setInterval(() => {
                    if (!isPlaying) {
                        clearInterval(interval);
                        return;
                    }
                    
                    currentTime++;
                    updateDuration();
                    
                    if (currentTime >= totalTime) {
                        isPlaying = false;
                        playBtn.textContent = '▶';
                        currentTime = 0;
                        updateDuration();
                        clearInterval(interval);
                    }
                }, 1000);
            }
            
            function updateDuration() {
                const minutes = Math.floor(currentTime / 60);
                const seconds = currentTime % 60;
                const totalMinutes = Math.floor(totalTime / 60);
                const totalSeconds = totalTime % 60;
                
                audioDuration.textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} / ${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            // Recreate neural network on resize
            document.getElementById('neuralBackground').innerHTML = '';
            setTimeout(() => new NeuralNetwork(), 100);
        });