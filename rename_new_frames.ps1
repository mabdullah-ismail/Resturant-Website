$i = 0
Get-ChildItem public/sequence/ezgif-frame-*.jpg | Select-Object -First 120 | ForEach-Object {
    $newName = "frame_$i.jpg"
    Rename-Item $_.FullName $newName
    $i++
}
# Delete the rest of the ezgif-frame-*.jpg files
Get-ChildItem public/sequence/ezgif-frame-*.jpg | Remove-Item
