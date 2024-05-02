from django.http import JsonResponse, HttpResponse
import subprocess
import mimetypes
import os

def run_script(request):
    # Get the script name from the request
    script_name = request.GET.get('script_name')
    script_args = request.GET.get('args', '')

    args_list = script_args.split(',')

    # Execute the script
    try:
        output = subprocess.check_output(['python', script_name] + args_list, stderr=subprocess.STDOUT)
    except subprocess.CalledProcessError as e:
        return JsonResponse({'error': 'Script failed', 'details': e.output.decode()}, status=500)

    # Variable to store script output type
    file_type, _ = mimetypes.guess_type(script_name)

    # Return json response if script return is just numbers or text
    if file_type == 'application/json':
        with open(output, 'r') as file:
            data = file.read()
        return JsonResponse({'output': file.read()})
    
    # Return image if script return is an image
    elif file_type and any(subtype in file_type for subtype in ('image/jpeg', 'image/png', 'image/gif')):
        with open(output, 'rb') as file:
            return HttpResponse(file.read(), content_type=file_type)

    # Check to see if returning a json file to have react make a table or to see if create the table and then return it
    # Possible caching of user inputs

    # Return error if script output is not a supported file type
    else:
        # Return the script's output
        return JsonResponse({'error': 'unsupported file type', 'details': 'The script output is not a supported file type.'})


# What to use in react to call this endpoint:

# const scriptName = 'example_script.py';
# const args = ['arg1', 'arg2', 'arg3'];

# // Construct the URL with query parameters
# const url = `/run-script/?script_name=${encodeURIComponent(scriptName)}&args=${encodeURIComponent(args.join(','))}`;

# // Make the request
# fetch(url)
#   .then(response => response.json())
#   .then(data => {
#     if (data.error) {
#       console.error('Error:', data.details);
#     } else {
#       console.log('Script output:', data.output);
#     }
#   });



