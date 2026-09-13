def extract_features(sequence: str):

    sequence = sequence.upper().replace(" ", "").replace("\n", "")

    length = len(sequence)

    a_count = sequence.count("A")
    t_count = sequence.count("T")
    c_count = sequence.count("C")
    g_count = sequence.count("G")

    if length == 0:
        return None

    features = {
        "sequence_length": length,

        "A_count": a_count,
        "T_count": t_count,
        "C_count": c_count,
        "G_count": g_count,

        "A_frequency": round(a_count / length, 4),
        "T_frequency": round(t_count / length, 4),
        "C_frequency": round(c_count / length, 4),
        "G_frequency": round(g_count / length, 4),

        "GC_content": round(
            ((g_count + c_count) / length) * 100,
            2
        ),

        "AT_content": round(
            ((a_count + t_count) / length) * 100,
            2
        )
    }

    return features