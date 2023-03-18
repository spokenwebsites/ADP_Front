def valid(value: str) -> bool:
  """valid checks if the provided string is valid or not."""
  return value != None and len(str(value).strip()) > 0