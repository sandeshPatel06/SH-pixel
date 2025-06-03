from django.http import JsonResponse

class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before the view is called.
        print(f"Request received: {request.method} {request.path}")

        response = self.get_response(request)

        # Code to be executed for each response after the view is called.
        print(f"Response status: {response.status_code}")

        return response

    # Example of process_exception (error handler)
    def process_exception(self, request, exception):
        print(f"An error occurred: {exception}")
        return JsonResponse(
            {"error": "An unexpected error occurred."},
            status=500
        )