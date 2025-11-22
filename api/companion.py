from http.server import BaseHTTPRequestHandler
import json
import urllib.request
import urllib.error
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Enable CORS
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        # Read request body
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        student_name = data.get('studentName', 'Student')
        context = data.get('context', '')
        message_type = data.get('type', 'encouragement')

        # Create prompt
        prompts = {
            'encouragement': f"Give {student_name} a short encouraging message: {context}",
            'correction': f"Gently help {student_name} understand: {context}",
            'celebration': f"Celebrate {student_name}'s success: {context}",
            'focus': f"Help {student_name} stay focused: {context}"
        }

        prompt = prompts.get(message_type, prompts['encouragement'])

        # Use Hugging Face API (FREE)
        api_key = os.environ.get('HUGGINGFACE_API_KEY', 'hf_demo')  # Demo key for testing
        
        # Use a free conversational model
        model = "microsoft/DialoGPT-medium"
        api_url = f"https://api-inference.huggingface.co/models/{model}"

        request_data = {
            "inputs": prompt,
            "parameters": {
                "max_length": 100,
                "temperature": 0.8
            }
        }

        req = urllib.request.Request(
            api_url,
            data=json.dumps(request_data).encode('utf-8'),
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            }
        )

        try:
            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode('utf-8'))
                
                # Extract response
                if isinstance(result, list) and len(result) > 0:
                    message = result[0].get('generated_text', f"Great job, {student_name}!")
                else:
                    message = f"You're doing wonderful, {student_name}!"
                
                response_data = {
                    'message': message,
                    'studentName': student_name
                }
                
                self.wfile.write(json.dumps(response_data).encode())
        except Exception as e:
            # Fallback messages if API fails
            fallback_messages = {
                'encouragement': f"You're doing great, {student_name}! Keep trying!",
                'correction': f"That's okay, {student_name}! Let's try again together.",
                'celebration': f"Amazing work, {student_name}! You did it!",
                'focus': f"Let's focus, {student_name}. You can do this!"
            }
            
            error_response = {
                'message': fallback_messages.get(message_type, f"Keep going, {student_name}!"),
                'error': str(e)
            }
            self.wfile.write(json.dumps(error_response).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
